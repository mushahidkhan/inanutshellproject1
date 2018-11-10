import React, { Component } from 'react'
import './post.css'
import { Markup } from 'interweave';
import ReactHtmlParser from 'react-html-parser';
import { Grid, Image } from 'semantic-ui-react'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const PostComponent = (props) => (
  <div >
  	<Grid className="postArea">
    <Grid.Row>
      <Grid.Column width={2}>
        <Image className="userProfile" src={props.userInfo.imageUrl} />
      </Grid.Column>

    <Grid.Column width={14} left-aligned>
        <h3>{props.postTitle}</h3>
         <p>By: {props.userInfo.username} - 2 seconds ago</p>
         {ReactHtmlParser(draftToHtml(convertToRaw(props.postContent.getCurrentContent())))}
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={16}>
        <p>




        </p>
      </Grid.Column>
    </Grid.Row>
    
    </Grid>

    
   </div>
)
export default PostComponent;


 
