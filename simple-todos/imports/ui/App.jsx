import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper';
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
 
    Meteor.call('tasks.insert', text);
    
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  
  render () {
    return( 
      <div className="container">
        <header>
          <h1>Todo List {this.props.incompleteTaskCount}</h1>
     
          <AccountsUIWrapper />
               
           {this.props.currentUser?
           <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form> :
          ''
          }
               
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
          
          
          <ul>{this.renderTasks()}</ul>
        </header>
      </div>
    );
  }
  
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteTaskCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteTaskCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
    
  };
}, App);
