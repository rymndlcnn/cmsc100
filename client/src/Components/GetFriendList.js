import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import GetPosts from './GetPosts.js'

class GetFriendList extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            friends: [],
            posts: []        
        }
        this.getPost = this.getPost.bind(this)
    }

    getPost(userId){
    	fetch('http://localhost:3000/get-posts/?userId='+userId)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                this.setState({posts: res.result})
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
        fetch('http://localhost:3000/get-friends/?userId='+this.props.userId)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                this.setState({friends: res.result})
            })
            .catch((e) => { console.log(e)});
      }
    }

    render(){
	     
	     
    	const FriendList = () => {
    		const options = this.state.friends.map((i) => (
	        	<div>
	        		<GetPosts id={i.friendId}/>
	        	</div>
	        ))
	        return <ul>{options}</ul>
	     }
    	return(
    		<div>
    			{<FriendList/>}
    		</div>
    	)
    }
}
export default GetFriendList;