import React, {Component } from 'react'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import GetFriendList from './GetFriendList.js'
import GetPosts from './GetPosts.js'
import AddPost from './AddPost.js'
import './CSS/Profile.css'
const qs = require("query-string")


class Profile extends Component {
    constructor() {
        super()

        this.state = {
            userId: 0,
            username: '',
            name: '',
            email: '',
            posts: [],
            requests: []
        }
        this.sendFriendRequest = this.sendFriendRequest.bind(this)
        this.showRequests = this.showRequests.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.rejectFriend = this.rejectFriend.bind(this)
    }

    addFriend(id){
        const friendRequest = {
            userId: localStorage.userId,
            friendId: id
        }
        fetch('http://localhost:3000/add-friend',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendRequest)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){
                alert("Friend request accepted")
            }else{ 
                alert('Failed to post') 
            }
          })
          window.location.reload(this)
    }

    rejectFriend(id){
        const friendRequest = {
            userId: localStorage.userId,
            friendId: id
        }
        fetch('http://localhost:3000/reject-friend',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendRequest)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){
                alert("Friend request rejected")
            }else{ 
                alert('Failed to post') 
            }
          })
          window.location.reload(this)
    }

    showRequests(){
        fetch('http://localhost:3000/get-friend-request/?userId='+localStorage.userId)
        .then((response) => { return response.json() })
        .then((res) => {
            this.setState({
                requests: res.result
            })
        })
        .catch((e) => { console.log(e)});
    }

    sendFriendRequest(friendId){
        const request = {
            userId: localStorage.userId,
            friendId: friendId
        }
        fetch('http://localhost:3000/send-friend-request',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){
                alert("Friend request sent")
            }else{ 
                alert('Failed to post') 
            }
          })
    }

    componentDidMount () {
        var id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).userId
            if(localStorage.usertoken){
                var token = localStorage.usertoken
                var decoded = jwt_decode(token)
                if(decoded.userId === id){
                    this.setState({
                        userId: decoded.userId,
                        username: decoded.username,
                        name: decoded.name,
                        email: decoded.email
                    })
                    
                }else{
                    fetch('http://localhost:3000/get-user/?userId='+id)
                    .then((response) => { return response.json() })
                    .then((res) => {
                        this.setState({
                            userId: id,
                            username: res.result[0].username,
                            name: res.result[0].name,
                            email: res.result[0].email
                        })
                    })
                    .catch((e) => { console.log(e)});        
                }
            }else{
                alert("Login to access page")
                this.props.history.push(`/`)

            }
    }

    componentWillReceiveProps(nextProps){
           window.location.reload()
    }


    render () { 
        var id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).userId
        const RequestList = () => {
            const options = this.state.requests.map((i) => (
                <div>   
                    <ul>
                        
                            <li>{i.username}</li>    
                            <Button onClick = {() => this.addFriend(i.userId)}>Accept</Button> 
                            <Button onClick = {() => this.rejectFriend(i.userId)}>Reject</Button>
                        <br/>
                        
                    </ul>
                </div>    
            ))
            return <ul>{options}</ul>
         }
        return ( 
            <div class="pdiv">
                    <table class="ptable">
                        <tr> Username: {this.state.username}</tr>
                        <tr className="ptr">
                            <td>Name: {this.state.name}</td>
                        </tr>
                        <tr className="ptr">
                            <td>Email: {this.state.email}</td>
                        </tr>
                        <tr><td><br/></td></tr>
                        <tr className="ptr">
                        </tr>
                    </table>
                    {/*<GetFriendList/>*/}

                     
                    {this.state.userId !== localStorage.userId ? <Button onClick = {() => this.sendFriendRequest(this.state.userId)}>Friend Request</Button>: ""}
                   
                     
                    {this.state.userId == localStorage.userId ?  <Button class="friendRequestButton" onClick = {() => this.showRequests()}>   Show Friend Requests </Button>
                    : ""}
                    

                    <div class="friendRequests"> 
                    <RequestList/>
                    </div>
                    

                    <div class="friendsList">
                    <GetFriendList userId={id}/>
                    </div>


                    <div class="addPosts">
                    <AddPost userId = {localStorage.userId} id = {id}/>
                    </div>

                    <div class="otherPosts"> 
                    <GetPosts id = {id}/>
                    </div>
            </div>
        )
    }
}

export default Profile