import React, { Component } from 'react';
import logo from './logo.svg';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      currentDate: {date: new Date()}
    };
 
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  addItem = (e) => {
    var itemArray = this.state.items;

    if(this._inputTaskElement.value !== ""){
      itemArray.unshift(
        {//todo: Description
          text: this._inputTaskElement.value,
          expDate: this._inputExpDateElement.value,
          importance: this._inputImportanceElement.value,
          isDone: false,
          key: Date.now()
        }
      )

      this.setState({
        items:itemArray
      });

      this._inputTaskElement.value = "";
      this._inputExpDateElement.value = "";
    };
  console.log(itemArray); 
  e.preventDefault();
  }

  deleteItem(key){
    var filtiredItems = this.state.items.filter(
      (item) => (item.key !== key)
    );

    this.setState({
      items:filtiredItems
    });
  }

  toggleDone(key){
    var itemArray = this.state.items;
    var itemIndex = itemArray.findIndex(
      (item) => (item.key === key));

    if (itemIndex !== -1) {
      itemArray[itemIndex].isDone = !itemArray[itemIndex].isDone;
    }

    this.setState({
      items:itemArray
    });
    console.log(this.state.items);
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputTaskElement = a}
               onChange={this.onChange} placeholder="enter task">
            </input>
            <input type="datetime-local"
              ref={(a) => this._inputExpDateElement = a}
              onChange={this.onChange} placeholder="enter exp date">
            </input>
            <select ref={(a) => this._inputImportanceElement = a}>
              <option>Обычная</option>
              <option>Важная</option>
              <option>Очень важная</option>
            </select>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoList entries={this.state.items} 
          delete={this.deleteItem}
          toggleDone={this.toggleDone}/>
      </div>
    );
  }
}

export default App;
