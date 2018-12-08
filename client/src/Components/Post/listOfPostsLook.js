import React, { Component } from 'react'
import axios from 'axios';
import { Feed, Icon } from 'semantic-ui-react';
import steem from 'steem'
import { Grid, Dropdown, Button, Divider } from 'semantic-ui-react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './post.css'
import MainPageFilterOfPosts from '../mainPageFiltersOfPosts'
var moment = require('moment');

class ListOfPostsLook extends Component {
 
 	state = {
 		posts: [],
 		postsToDisplay: [],
		prevNumberOfPosts: 0,
		postsObj: {},
		genre: 'All Content',
 	}

 	getPostsByGenre(){

 	}

	componentDidMount() {
		if(this.props.genrePicked) {
			this.state.genre = this.props.genrePicked;
		}
		steem.api.getDiscussionsByCreated( { tag: 'mushposts', limit: 10 }, (err, results) => {
			if(!err) {
				this.setState({posts: results, prevNumberOfPosts: results.length})
				var postsObj = {};
				if(this.state.posts['created']){

				}
	 			for(var elem of this.state.posts) {
	 				var author = elem['author']
		  			steem.api.getAccounts([author], (err, res)=> {
	 	  				if(!err) {
	 	  					if(res[0].json_metadata) {
	 	  					 	if(JSON.parse(res[0].json_metadata)['profile']['profile_image']) {
	 	  						 	postsObj[res[0]['name']]  = JSON.parse(res[0].json_metadata)['profile']['profile_image']
	 	  						} else {
	 	  				 	  		postsObj[res[0]['name']] = ""
	 	  						}

		 	  					this.setState({ postsObj })
		 	  					this.setState({ postsToDisplay: this.state.posts})

	 	  					}

		  				}

		  			})

 			}
			}
 		})
 

 	}

getPostsByFilter() {
	if(this.state.genre == 'All Content') {
		this.state.postsToDisplay = this.state.posts;
	} else {
		for(var post of this.sate.posts) {
			var json_metadata = JSON.parse(post['json_metadata']);
			var tags = json_metadata['tags']
			var postGenre = tags[1];
			if(this.state.genre == postGenre) {
				this.state.postsToDisplay.push(post);
			}
		}
	}
}
   componentWillReceiveProps(newProps) {
   	console.log(newProps)
   	var genrePicked;
   	switch(newProps.genrePicked) {
   		case 2:
   			genrePicked = 'leadershiplearns';
   			break;
   		case 3:
   			genrePicked = 'fieldoftechnology';
   			break;
   		case 4:
   			genrePicked = 'genderpaygap';
   			break;
   		case 5:
   			genrePicked = 'psychologylearningbymush';
   			break;
   		case 6:
   			genrePicked = 'Religion';
   			break;
   		case 7:
   			genrePicked = 'Fiction';
   			break;
   		default:
   			genrePicked = 'All';
   	}
   		if(genrePicked == 'All') {
   			this.setState({postsToDisplay: this.state.posts})
   			return;
   		}
   		var postsToDisplay = [];    
		for(var post of this.state.posts) {
			var json_metadata = JSON.parse(post['json_metadata']);
			var tags = json_metadata['tags']
			var postGenre = tags[1];
			if(postGenre == genrePicked) {
				postsToDisplay.push(post);
			}
		}
		this.setState({postsToDisplay: postsToDisplay})
	
   }

	render() {
		return (
			<div className="listOfPosts">
				<Feed>
				{this.state.postsToDisplay.map((elem, i) => {
					var body = elem['posts'];
					var imageUrl = "";

					var time = moment.utc(elem['created'], "YYYY-MM-DD hh:mm:ss").fromNow(); // 7 years ago
					var date = new Date(elem['created']); 
 


					if(elem['body'].length > 400) {
						body = elem['body'].slice(0, 400) + "...";
					} 
 						imageUrl = this.state.postsObj[elem['author']]
 					 return (
						<Feed.Event className="feed">
					      <Feed.Label>
					      	<img className="imageA" src={imageUrl}/>
					      </Feed.Label>
					      <Feed.Content>
					        <Feed.Summary>
					          <h4>{elem['author']}</h4> 
					        </Feed.Summary>
					        <Feed.Extra text className="contentParent">
					          	<h3>{elem['root_title']}</h3>
					        	<p className="postBody">{ReactHtmlParser(elem['body'].slice(0, 400) + "...") }</p>
			     		   <Feed.Date><p>Posted { time }</p></Feed.Date>
					        </Feed.Extra>
					      </Feed.Content>
					    </Feed.Event>	

					 	)
				})}		
				</Feed>
		</div>
	)
	
}
}
export default ListOfPostsLook;