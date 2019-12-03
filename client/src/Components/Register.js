import React, { Component } from 'react'
import './CSS/Register.css'
class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            name: '',
            password: '',
            birthday: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            email: this.state.email,
            name: this.state.ame,
            password: this.state.password,
            birthday: this.state.birthday
        }

        fetch('http://localhost:3000/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){ 
                alert('Successfully saved user')
            }else{ 
                alert('Failed to save user') 
            }
          })
    }

    render () {
        return (
                <div id="main">
                <form id="signUpForm" noValidate onSubmit={this.onSubmit}>
                            <h1>Sign-up</h1>
                            <div >
                                <label>Username:</label>
                                <input type="text"
                                    name = "username"
                                    class="signUpInputBox"
                                    placeholder="Enter Username"
                                    value={this.state.username}
                                    onChange={this.onChange} />
                            </div>
                            <div>
                                <label>Name: </label>
                                <input type="text"
                                    name = "display_name"
                                    class="signUpInputBox"
                                    placeholder="Enter Display Name"
                                    value={this.state.display_name}
                                    onChange={this.onChange} />
                            </div>
                            <div>
                                <label>Birthday</label>
                                <input type="text"
                                    name="birthday"
                                    class="signUpInputBox"
                                    placeholder="mm/dd/yy"
                                    value={this.state.birthday}
                                    onChange={this.onChange} />
                            </div>
                            <div>
                                <label>Email Address</label>
                                <input type="email"
                                    name="email"
                                    class="signUpInputBox"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password"
                                    name="password"
                                    class="signUpInputBox"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" 
                                class = "registerButton">
                                Register
                            </button>
                            <div> <a class="forgotPasswordButton" href=""> Forgot Password </a> </div>

                    </form>
                    </div>

        )
    }
}

export default Register