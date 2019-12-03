import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class GetComments extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            commentId:0,
            edit: false,
            newComment: "",
            comments: []        
        }
        this.handleChange = this.handleChange.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({newComment: event.target.value});
      }

    handleSubmit(event, commentId){
        const comment = {
            comment: this.state.newComment,
            userId: this.props.id,
            commentId: this.state.commentId
        }
        fetch('http://localhost:3000/edit-comment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
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

    editComment(commentId){
        this.setState({
            edit:true,
            commentId: commentId
        })
    }

    deleteComment(commentId){
        const comment = {
            commentId: commentId,
            
        }
        fetch('http://localhost:3000/delete-comment/?commentId='+commentId,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
          })
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                
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
        console.log(this.props.id)
        console.log(this.props.postId)
        fetch('http://localhost:3000/get-comments/?userId='+this.props.id+"&postId="+this.props.postId)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                this.setState({comments: res.result})
            })
            .catch((e) => { console.log(e)});    
      }
    }

    render(){

    	const CommentList = () => {
    		const options = this.state.comments.map((i) => (
        		<div>	
                    <ul>
                        <Link to = {'/profile/?userId='+i.userId}>
                            <li>{i.username}</li>    
                        </Link> 
                        {i.comment}
                        <br/>
                        {i.userId == localStorage.userId ?
                        <Button onClick = {() => this.deleteComment(i.commentId)}> Delete Comment</Button> : ""}
                        {i.userId == localStorage.userId ?
                        <Button onClick = {() => this.editComment(i.commentId)}> Edit Comment</Button> : ""}


        
                        
                    </ul>
                </div>    
	        ))
	        return <ul>{options}</ul>
	     }
    	return(
    		<div>
    			<CommentList/>
                {this.state.edit ?
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Comment:
                            <textarea content={this.state.newComment} onChange={this.handleChange} />
                        </label>
                        <input type="submit"  value="Submit" />
                    </form> : ""}
    		</div>
    	)
    }
}
export default GetComments;