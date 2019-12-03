import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AddPost from './AddPost.js'
import GetPosts from './GetPosts.js'
import GetFriendList from './GetFriendList.js'
import './CSS/Wall.css'

class Wall extends Component {
    constructor(){
        super()
        this.state = {
            userId: 0,
            posts:[],
            friends: []        
        }
    }

    componentDidMount(){
      if(localStorage.usertoken){
        
      }else{
          alert("Login to access page")
          this.props.history.push(`/`)
      }
    }

    render(){
      var token = localStorage.usertoken
      var decoded = jwt_decode(token)
      return (  
        <div class="wall">
        
          <div class="addPost">
            <AddPost userId = {localStorage.userId} id = {decoded.userId}/>
          </div>

          <div class="getPost">
            <GetPosts id={decoded.userId}/>
          </div>

          <div class="getFriendList">
            <GetFriendList userId={decoded.userId}/>
          </div>
        </div>
      );         
    }
}

export default Wall
