import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AddComment from './AddComment.js'
import GetComments from './GetComments.js'

class GetPosts extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            postId:0,
            posts: [],        
            edit: false,
            makeComment:false,
            newPost:"",
        }
        this.getPost = this.getPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.addComment = this.addComment.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editPost = this.editPost.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    addComment(){
        this.setState({makeComment: true});
    }

    handleChange(event) {
        this.setState({newPost: event.target.value});
      }

    handleSubmit(event){
        const post = {
            content: this.state.newPost,
            userId: this.props.id,
            postId: this.state.postId
        }
        fetch('http://localhost:3000/edit-post',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){
                window.location.reload()
            }else{ 
                alert('Failed to post') 
            }
          })
          event.preventDefault()
    }

    editPost(postId){
        this.setState({
            edit:true,
            postId: postId
        })
    }


    deletePost(postId){
        const post = {
            postId: postId,
            
        }
        fetch('http://localhost:3000/delete-post/?userId='+postId,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          })
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                
            })
            .catch((e) => { console.log(e)});

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
        fetch('http://localhost:3000/get-posts/?userId='+this.props.id)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                console.log(res.result[0].username)
                this.setState({posts: res.result})
            })
            .catch((e) => { console.log(e)});
      }
    }

    render(){

    	const PostList = () => {
    		const options = this.state.posts.map((i) => (
        		<div>	
                    <ul>
                        <Link to = {'/profile/?userId='+i.userId}>
                            <li>{i.username}</li>    
                        </Link> 
                        {i.content}
                        <br/>
                        {this.props.id == this.state.userId ? 
                            <Button onClick = {() => this.deletePost(i.postId)}> Delete</Button> : ""}
                        {this.props.id == this.state.userId ?
                            <Button onClick = {() => this.editPost(i.postId)}> Edit Post</Button> : ""}

                        {this.state.makeComment ? <AddComment userId = {this.state.userId} postId = {i.postId}/> : ""}
                        <Button onClick = {() => this.addComment()}> Add Comment</Button> 
                        <GetComments id = {i.userId} postId = {i.postId}/>
                    </ul>
                </div>    
	        ))
	        return <ul>{options}</ul>
	     }
    	return(
    		<div>
                {this.state.edit ?
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    What's on your mind?
                                    <textarea content={this.state.newPost} onChange={this.handleChange} />
                                </label>
                                <input type="submit"  value="Submit" />
                            </form> : ""}
    			<PostList/>
    		</div>
    	)
    }
}
export default GetPosts;