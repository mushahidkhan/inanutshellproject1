import React, { Component } from 'react'
import axios from 'axios';
import { Feed, Icon } from 'semantic-ui-react';
import steem from 'steem'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Dropdown, Button, Divider, Popup } from 'semantic-ui-react'
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
		open: true,
		genre: 'mushposts'
 	}

 	getPostsByGenre = (genre) => {
 		steem.api.getDiscussionsByCreated( { tag: genre, limit: 6 }, (err, results) => {
			if(!err) {
				console.log(results)
				this.setState({posts: results, prevNumberOfPosts: results.length})
				var postsObj = {};
				if(this.state.posts['created']){

				}
	 			for(var elem of this.state.posts) {
	 				var author = elem['author']
		  			steem.api.getAccounts([author], (err, res) => {
	 	  				if(!err) {
	 	  					if(res[0].json_metadata) {
	 	  					 	if(JSON.parse(res[0].json_metadata)['profile']) {
	 	  						 	postsObj[res[0]['name']]  = JSON.parse(res[0].json_metadata)['profile']['profile_image']
	 	  						} else {
	 	  				 	  		postsObj[res[0]['name']] = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2000px-Circle-icons-profile.svg.png"
	 	  						}

		 	  					this.setState({ postsObj })
	 	  					}

		  				}

		  			})

 			}
			}
 		})
 	}

 	loadMorePosts = () => {
		steem.api.getDiscussionsByCreated({
			tag: this.state.genre, 
			limit:6, 
			start_author:this.state.posts[this.state.posts.length - 1].author,
			start_permlink: this.state.posts[this.state.posts.length - 1].permlink 
		}, (error2, results2) => {
			results2.shift();
			if(results2.length == 0) {
				console.log("no more")
				this.setState({ open: false})
			}
			this.setState({posts: [...this.state.posts,...results2]}, () => {
			})
		})
	}

	componentDidMount() {
		this.getPostsByGenre("mushposts")
 	}

  handleRef = node => this.setState({ node })

componentWillReceiveProps(newProps) {
	this.setState({ open: true})
   	var genrePicked;
   	console.log(newProps)
   	switch(newProps.genrePicked) {
   		//some unique genre keys will have to be picked
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
   			genrePicked = 'mushposts';
   	}
   		this.setState({ genre: genrePicked })
   		this.getPostsByGenre(genrePicked)
	
   }

	render() {
		    const { node, open } = this.state
		return (
			<div className="listOfPosts">
				<Feed>
				{this.state.posts.map((elem, i) => {
					var body = elem['posts'];
					var imageUrl = "";

					var time = moment.utc(elem['created'], "YYYY-MM-DD hh:mm:ss").fromNow(); // 7 years ago
					var date = new Date(elem['created']); 
 


					if(elem['body'].length > 400) {
						body = elem['body'].slice(0, 400) + "...";
					} 
 						imageUrl = this.state.postsObj[elem['author']]
 					 return (
						<Feed.Event >
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
					{this.state.open? <Button primary attached='bottom' className="morePosts" onClick={this.loadMorePosts}>More Posts</Button> : <h3 className="noMorePosts">No More Posts</h3>}

		</div>
	)
	
}
}
export default ListOfPostsLook;