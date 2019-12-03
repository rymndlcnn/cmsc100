import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import './CSS/Login.css'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password
        }
         
         fetch('http://localhost:3000/login',
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
                localStorage.setItem('usertoken', body.token)
                localStorage.setItem('userId', body.userId) 
                this.props.history.push(`/profile/?userId=`+body.userId)
            }else{ 
                alert('Failed to login to account') 
            }
          })
    }

    render () {
        return (
              <form  noValidate onSubmit={this.onSubmit}>  
                <table id="loginTable">
                    <tr>
                        <td>Email</td>
                        <td>Password</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange}></input>
                        </td>
                        <td>
                            <input type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}></input>
                        </td>
                        <td>
                            <Button type="submit">Login</Button>
                        </td>
                        <Link to="/"><Button> Sign-up</Button> </Link>
                    </tr>
                    <tr>
                        
                    </tr>
                    </table>
                </form>      
                
        )
    }
}

export default Login