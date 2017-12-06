import React, { Component } from 'react';
import logo from './logo.svg';
import TodoList from './TodoList';
import './index.css';
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

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnMount(){
    clearInterval(this.timerID);
  }

  deadline(deadline){
    let isLateYetArray = this.state;
    let sadFlag = false;
    isLateYetArray.items.forEach(function(item){
        if(item.expDate >= deadline){ 
          sadFlag = true;
          item.isLate = true;
          console.log("shiet");
        }
      }
     )
    console.log("isLateYetArray " + isLateYetArray + ", deadline " + deadline );
    if(sadFlag)
    {
        this.setState({
        items:isLateYetArray
      });
    }
  }

  tick(){
    this.setState({
      currentDate: new Date()
    });
    this.deadline(this.setState.currentDate);
  }

  parseYMDHM(s) {
    if(s!==""){
      let b = s.toString().split(/\D+/);
      return new Date(b[0], --b[1], b[2], b[3], b[4], b[5]||0, b[6]||0);
    }
    return "";
  }

  addItem = (e) => {
    let itemArray = this.state.items;
    let expDate = this.parseYMDHM(this._inputExpDateElement.value);
    console.log("expDate = " + expDate);
    let isLateYet = (expDate>this.state.currentDate)||(expDate==="")?false:true;

    if(this._inputTaskElement.value !== ""){
      itemArray.unshift(
        {//todo: Description
          text: this._inputTaskElement.value,
          expDate: this._inputExpDateElement.value,
          importance: this._inputImportanceElement.value,
          isDone: false,
          isLate: isLateYet,
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

  deleteFinished(){
    var filtiredItems = this.state.items.filter(
      (item) => (!item.isDone)
    );

    this.setState({
      items:filtiredItems
    });
  }

  render() {
    return (
      <div className="appMain">
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
              <option>Usual</option>
              <option>Serious</option>
              <option>Extra</option>
            </select>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoList entries={this.state.items} 
          delete={this.deleteItem}
          toggleDone={this.toggleDone}/>
          <button onClick={(e) => this.deleteFinished(e)}>clear finished</button>
      </div>
    );
  }
}

export default App;
