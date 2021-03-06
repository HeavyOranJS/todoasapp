import React, { Component } from 'react';
import './App.css';

class TodoItems extends React.Component {
 constructor(props, context) {
   super(props, context);

   this.createTasks = this.createTasks.bind(this);
   this.toggleDone = this.toggleDone.bind(this);
   this.delete = this.delete.bind(this);
 }

 delete(key){
   this.props.delete(key);
 }

 toggleDone(key){
   this.props.toggleDone(key);
 }

 createTasks(item) {
   return <li key={item.key}>
    <span className = {"status"}>{item.importance} </span>
    {item.isLate?<span className = {"status"} >Late!</span>:""}
      <span style = {
          {textDecoration : (item.isDone)?"line-through":"none"}
        }
       className = {"name"} 
       onClick={(e) => this.toggleDone(item.key, e)}> 
        {item.text} {item.expDate.split("T")[0]} {item.expDate.split("T")[1]}
    </span>
    
    <span className = "deleteBtn" onClick={(e) => this.delete(item.key, e)}>X</span></li>
 }

 render() {
   var todoEntries = this.props.entries;
   var listItems = todoEntries.map(this.createTasks);

   return (
     <ul className="theList">
         {listItems}
     </ul>
   );
 }
};

export default TodoItems;