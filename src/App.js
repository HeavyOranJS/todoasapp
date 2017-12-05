import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: []
    };
 
    this.addItem = this.addItem.bind(this);
  }

  addItem = (e) => {
    var itemArray = this.state.items;

    if(this._inputTaskElement.value !== ""){
      itemArray.unshift(
        {//todo: Description
          text: this._inputTaskElement.value,
          expDate: this._inputExpDateElement.value,
          importance: this._inputImportanceElement.value,
          key: Date.now()
        }
      )

      this.setState({
        items:itemArray
      });

      this._inputTaskElement.value = "";
    };
  console.log(itemArray); 
  e.preventDefault();
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
      </div>
    );
  }
}

export default App;
