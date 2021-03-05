import React, { Component } from 'react'
import './LogInModal.css'
import { login } from '../../services/auth';

export default class LogInModal extends Component {
  state = {
    username: '',
    password: '',
    message: '',
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password)
      .then(user => {
        if (user.message) {
          this.setState({
            message: user.message,
            username: '',
            password: ''
          })
        } else {
          // the response from the server is a user object -> signup was successful
          // we want to put the user object in the state of NavBar.js
          this.props.setUser(user);
          this.props.handleClose();
          // this.props.history.push('/'); // this need to be passed in the router app.js
        }
      })
  }


  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
      <section className="modal-main">
      <form onSubmit={this.handleSubmit}>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
          />
          <button type="submit">LOG IN</button>
          {this.state.message && (
            <h3>{this.state.message}</h3>
          )}
        </form>
        <button type="button" onClick={this.props.handleClose}>
          Close
        </button>
      </section>
    </div>
    )
  }
}




