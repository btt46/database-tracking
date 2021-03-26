import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import { Table } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_tel: '',
      user_addr: '',
      user_email: '',
      user_status: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  track = (text) => {
    Axios.post('http://127.0.0.1:5000/track', {
      email: text,
    }).then((res) => {
      let data_list = res.data.result
     
      this.setState({
        user_name: data_list[0],
        user_tel: data_list[1],
        user_addr: data_list[2],
        user_email: data_list[3],
        user_status: data_list[4],
      })
      
    })
  };

 
  

  handleSubmit = event => {
    this.track(this.state.user_email, this)
    event.preventDefault();
  };  

  handleChange = event => {
    this.setState({ user_email: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Tracking</h1>
            <form onSubmit={this.handleSubmit}>
              <input name="email"
                     type="text"
                     value={this.state.user_email}     
                     onChange={this.handleChange} />
              <input type="submit" value="Track" />
            </form>
            <br />

            <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Telephone</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.user_name}</td>
                        <td>{this.state.user_tel}</td>
                        <td>{this.state.user_addr}</td>
                        <td>{this.state.user_email}</td>
                        <td>{this.state.user_status}</td>
                      </tr>
                    </tbody>
                </Table>
        </header>
      </div>
    );
  }
}


