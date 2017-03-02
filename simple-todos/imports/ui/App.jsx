import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks';
import Task from './Task.jsx';

class App extends Component{
  
  constructor(props){
    super(props);
    
    this.state = {
      hideCompleted: false
    };
    
  }
  
  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    })
  }
  
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task=> !task.checked)
    }
    return filteredTasks.map((task)=> (<Task key={task._id} task={task} />));
  
    }
  handleSubmit(e) {
     e.preventDefault();
 
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date()
    });
 
    
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  render () {
    return( 
      <div className="container">
        <header>
          <h1>Todo List {this.props.incompleteTaskCount}</h1>
          
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
          
           <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
          <ul>{this.renderTasks()}</ul>
        </header>
      </div>
    );
  }
  
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteTaskCount: Tasks.find({checked: {$ne: true}}).count(),
  };
}, App);
