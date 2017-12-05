import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      term: '',
      items: []
    };
  }
  
  onSubmit = (event) => {
    event.preventDefault()//prevents form from submitting in my case
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <form className="App" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange} />
            <button>Submit</button>
          </form>
          <List items={this.state.items}/>
        </p>
      </div>
    );
  }
}

export default App;
