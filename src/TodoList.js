import React, { Component } from 'react';

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
  let decoration=(item.isDone)?"line-through":"none";

   return <li key={item.key}>
     <span style = {{textDecoration : decoration}} onClick={(e) => this.toggleDone(item.key, e)}>
      {item.importance} {item.text} {item.expDate.split("T")[0]} {item.expDate.split("T")[1]}
     </span>
    <button onClick={(e) => this.delete(item.key, e)}>X</button></li>
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