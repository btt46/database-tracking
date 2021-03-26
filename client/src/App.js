import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  track = text => {
    Axios.post('http://127.0.0.1:5000/track', {
      post_text: text
    }).then(function(res) {
      alert(res.data.result);
    })
  };

  handleSubmit = event => {
    this.track(this.state.value)
    event.preventDefault();
  };  

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Tracking</h1>
            <form onSubmit={this.handleSubmit}>
              <input name="email"
                     type="text"
                     value={this.state.value}     
                     onChange={this.handleChange} />
              <input type="submit" value="Track" />
            </form>
        </header>
      </div>
    );
  }
}


