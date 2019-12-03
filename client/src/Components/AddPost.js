import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './CSS/AddPost.css'
class AddPost extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            content: ""        
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({content: event.target.value});
      }
    handleSubmit(event){
        const post = {
            userId: localStorage.userId,
            wallId: this.props.id,
            content: this.state.content
        }
        fetch('http://localhost:3000/add-post',
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


    render(){
    	return(
    		<form onSubmit={this.handleSubmit}>
                <div class="commentBox">
                <label class="postsSection">
                     <br/>
                    <textarea class="textArea" content={this.state.content} onChange={this.handleChange} placeholder="What's on your mind?"/>
                </label>
                <input class="submitButton" type="submit" value="Post" />
                </div>
            </form>
    	)
    }
}
export default AddPost;