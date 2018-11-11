import React, { Component } from 'react'
import TextEditor from './textEditor'
import ModalPreviewComponent from './modalPreviewComponent'
import HeaderComponent from './headerComponent'
import { Grid } from 'semantic-ui-react'
import { Input, Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import BottomOfBottomOfCreatePost from './bottomOfCreatePost'
 import './createPost.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class CreatePostComponent extends Component {
 
	state = {
		userInfo: this.props.location.userInfo,
		postTitle:'',
		bookTitle:'',
		postContent: '',
		bookSummaryTextLength: 0,
      editorState: EditorState.createEmpty()

	}

  onEditorStateChange: Function = (postContent) => {
    this.setState({
      postContent,
      bookSummaryTextLength: convertToRaw(postContent.getCurrentContent())["blocks"][0]["text"].length
    }); 
  };

	updatePostTitle = (e) => {
		this.setState({postTitle: e.target.value})
	}

	updateBookTitle = (e) => {
		this.setState({bookTitle: e.target.value})
	}

 	onPostSubmit = () => {
 		if(this.state.postTitle.length == 0) {
 			alert("Please enter the post title")
 		} if(this.state.bookTitle.length == 0) {
 			alert("Please enter the book title")
 		} if(convertToRaw(this.state.postContent.getCurrentContent())["blocks"][0]["text"].length == 0) {
 			alert("Please enter the book summary")																					
 		} else {
 			var postData = {
 				postTitle: this.state.postTitle, 
				postContent: convertToRaw(this.state.postContent.getCurrentContent())["blocks"][0]["text"], 
				bookTitle: this.state.bookTitle
 			}

 			var axiosConfig = {

					'authorization' : 'BEARER ' + this.state.userInfo.token
 				
 			}
			axios.post('/postContent', postData, {headers: axiosConfig}).then(response => {
					console.log(response)
 			 		 	if(response) {
							this.props.history.push({
							  pathname: '/',
							  userInfo: this.state.userInfo

							})
			 		 	}
			     	}
			  ).catch(function (error) {
    console.log(error.response);
  });

 		}
 	}
	render() {
		
    const { editorState } = this.state;

		return (
			<div>
			<HeaderComponent userInfo={this.state.userInfo}/>
			<Grid  columns={16}>
					      <Grid.Column width={3}>
					      </Grid.Column>
					      <Grid.Column width={10}>
							  <Form>
						    <Form.Field>
						      <input placeholder='Post Title' value={this.state.postTitle} onChange={this.updatePostTitle} />
						    </Form.Field>
						    <Form.Field>
						      <input placeholder='Book Title' value={this.state.bookTitle} onChange={this.updateBookTitle} />
						    </Form.Field>
						    <Form.Field>
          <Editor className="postContentEditor"
          editorState={this.state.postContent}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
            toolbar={{
            	    inline: {     options: ['bold', 'italic', 'underline', 'strikethrough']},
            	    list:{options: ['unordered', 'ordered']},

    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'emoji', 'history'],

  }}
        />

						    </Form.Field>
						    <Button onClick={this.onPostSubmit} primary type='submit'>Submit</Button>
						    <ModalPreviewComponent userInfo={this.state.userInfo} postTitle={this.state.postTitle} postContent={this.state.postContent}/>
						  </Form>


						   </Grid.Column>
					      <Grid.Column width={3}>
					      </Grid.Column>
				</Grid>


			</div>

		)
	}
}
export default CreatePostComponent;