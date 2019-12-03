import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import jwt_decode from 'jwt-decode'
import './CSS/Navbar.css'
// import {Logo} from './Media/final.jpg'
class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            userId: 0,
        }
        this.searchUser = this.searchUser.bind(this)
    }

    searchUser(e){
    const query = e.target.value;

    fetch('http://localhost:3000/search-user/?username='+query)
          .then((response) => { return response.json() })
          .then((res) => {
              console.log(res.result)
              this.setState({users: res.result})
          })
          .catch((e) => { console.log(e)});

  }

    componentDidMount(){
        if(localStorage.usertoken){
            var token = localStorage.usertoken
            var decoded = jwt_decode(token)
            this.setState({
                userId: decoded.userId
            })
        }
    }
    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render(){
        const Suggestions = () => { 
          const options = this.state.users.map((r) => (
            <Link to = {"/profile/?userId="+r.userId}> 
              <div>
                <table>
                    <td> 
                      <li key={r.userId}>
                        <div>
                          <h5><span>{r.name}</span></h5>
                        </div>
                    </li>
                    </td>
               </table>
              </div>
            </Link>
          ))
          return <ul>{options}</ul>
        }

        {/*==================== Content of menu changes depending if user is logged in or not ====================*/}
        const loginRegLink = (
            <div className="header">
                <table>
                    <tr>
                        <td>
                            <Login history = {this.props.history}/>
                        </td>
                    </tr>
                 </table>   
             </div>           
            
            
        )

        const userLink = (
            <div class="header">
                <table>
                    <tr><p></p></tr>
                    <tr><p></p></tr>
                    <tr>
                    <td>
                        <Link to = {"/profile/?userId="+this.state.userId}>
                            <Button class="header-button"> Profile </Button>
                        </Link>
                    </td>
                    <td>
                        <Link to="" onClick={this.logOut.bind(this)}>
                            <Button class="header-button" s>Logout</Button>
                        </Link>
                    
                    </td>
                    </tr>

                 </table>   
             </div>           
           
        )
        {/*=======================================================================================================*/}
        return (
            <header class="App-header">

                <div class="clogo">
                
                    {localStorage.usertoken ? <Link to="/wall"> Social Media  <img src="./Media/final.png" /></Link>:<Link to="/">  Social Media <img src="./Media/final.png" /></Link>}
                </div>
                
                <div class="loginButtons">
                  {localStorage.usertoken ? userLink : loginRegLink}
                </div>
                
                <div class="searchBarContainer">
                  <article class="csearch-bars">
                    <input type="text" 
                      class="search" 
                      name="Search"
                      placeholder="Search for a user"
                      value={this.state.query}
                      onChange={this.searchUser}
                    />
                    <Suggestions/>
                  </article>
                </div>
            </header>
        )
    }
}

export default withRouter(Navbar)
