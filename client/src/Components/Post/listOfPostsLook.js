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
		prevNumberOfPosts: 0,
		postsObj: {},
		filter: this.props.filterPicked,
		genre: this.props.genrePicked
 	}

 	getPostsByCreated(){

 	}

 	getPostsByTrending(){

 	}

 	getPostsByHot(){

 	}

 	getPostsByGenre(){

 	}

	componentDidMount() {
		console.log("*******")
		console.log(this.state.filter)
		steem.api.getDiscussionsByCreated( { tag: 'mushlearn', limit: 10 }, (err, results) => {
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
	 	  					}

		  				}

		  			})

 			}
			}
			
			//this.setState({ posts: postsWithImageUrl})

 		})
 

 	}

	getNextTenPosts = () => {
	steem.api.getDiscussionsByCreated({
		tag: 'mushlearn', 
		limit: 10, 
		start_author: this.state.posts[this.state.posts.length - 1].author,
		start_permlink: this.state.posts[this.state.posts.length - 1].permlink 
	}, (error2, results2) => {
		results2.shift();
		this.setState({posts: [...this.state.posts,...results2]}, () => {
			if(this.state.posts.length > this.state.prevNumberOfPosts) {
				this.setState({prevNumberOfPosts: this.state.posts.length})
						var postsWithImageUrl = [];
			for(var i = 0; i< this.state.posts.length; i++) {
				var elem = this.state.posts[i];
				steem.api.getAccounts([elem['author']], (err, result) => {
					if(JSON.parse(result[0].json_metadata)['profile']) {
					elem['imageUrl'] = (JSON.parse(result[0]["json_metadata"])).profile.profile_image;
					postsWithImageUrl.push(elem);					
					}

			    });		
		    this.setState({ posts: postsWithImageUrl})
			}	
			}
		})
	})

}

	render() {
		console.log("inrender")
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