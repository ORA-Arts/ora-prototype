import React, { Component } from 'react'
import './SignUpModal.css'
import { signup } from '../../services/auth'

export default class SignUpModal extends Component {

  state = {
    username: '',
    password: '',
    userType: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    console.log(this.state.userType)
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, userType } = this.state;
    signup(username, password, userType)
      .then(user => {
        if (user.message) {
          this.setState({
            message: user.message,
            username: '',
            password: '',
            userType: ''
          })
        } else {
          // the response from the server is a user object -> signup was successful
          // we want to put the user object in the state of App.js
          console.log(user)
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
      <div className='buttonContainer'>
      <button className="buttonClose" type="button" onClick={this.props.handleClose}>
          X
        </button>
      </div>
      <form onSubmit={this.handleSubmit}>
      <div id="signUpContainer">
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
          <div id='selectUser'>
          <input 
            type="radio"
            name="userType"
            id="collector"
            value="collector"
            onChange={this.handleChange}
            />
          <label htmlFor='collector'>I AM A COLLECTOR</label>
          <input 
            type="radio"
            name="userType"
            id="gallery"
            value="gallery"
            onChange={this.handleChange}
            />
          <label htmlFor='gallery'>I AM A GALLERY</label>
          </div>
          <button type="submit">SIGN UP</button>
          {this.state.message && (
            <h3>{this.state.message}</h3>
          )}
          
          </div>
        </form>
      </section>
    </div>
    )
  }
}
