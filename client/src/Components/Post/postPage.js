import React, { Component } from 'react'
import { Grid, Image, Item, Header } from 'semantic-ui-react'
import HeaderComponent from '../headerComponent'
import steem from 'steem'
import PostInfo from './postInfo'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './post.css'
var moment = require('moment');

class PostPage extends Component {
	state = {
		postAuthor: this.props.match.params.author,
		postPermLink: this.props.match.params.permLink,
		userInfo: this.props.location.userInfo,
		postDetails:{},
		postGenre: '',
		timeFromNow: '',
		postAuthorImage:''

	}

	getAuthorInfo(author) {

	}

	componentDidMount() {
		console.log(this.state.postPermLink)
		steem.api.getContent(this.state.postAuthor, this.state.postPermLink , (err, result) => {
			console.log(result)
			var genrePicked;
			this.setState({ postDetails: result})
			this.setState({ timeFromNow: moment.utc(result['created'], "YYYY-MM-DD hh:mm:ss").fromNow() })
			  	switch(JSON.parse(result['json_metadata'])['tags'][1]){
		   		//some unique genre keys will have to be picked
		   		case 'leadershiplearns':
		   			genrePicked = 'business';
		   			break;
		   		case 'fieldoftechnology':
		   			genrePicked = 'finance';
		   			break;
		   		case 'genderpaygap':
		   			genrePicked = 'health & fitness';
		   			break;
		   		case 'psychologylearningbymush':
		   			genrePicked = 'leadership';
		   			break;
		   		case 'Religion':
		   			genrePicked = 'religion';
		   			break;
		   		case 'Fiction':
		   			genrePicked = 'fiction';
		   			break;
		   		default:
		   			genrePicked = 'mushposts';
		   	}
		   	this.setState({postGenre: genrePicked})
		   	steem.api.getAccounts([this.state.postAuthor], (err, res) =>{
		   		console.log(res)
		   		var result = res[0]
					if(result['json_metadata']) {
						if(JSON.parse(result['json_metadata'])['profile']) {
							if(JSON.parse(result['json_metadata'])['profile']['profile_image']) {
								this.setState({ postAuthorImage: JSON.parse(result['json_metadata'])['profile']['profile_image'] })
							}
						} else {
						this.setState({ postAuthorImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2000px-Circle-icons-profile.svg.png'})
						}
					} 
			})
		})
	}

	render() {
		console.log(this.props.location)
		return (
			<div>
				<HeaderComponent userInfo={this.state.
					userInfo} className="header"/>
			  <Grid>
			 	<Grid.Column width={4}></Grid.Column>
			    <Grid.Column textAlign="left" width={8}>
			        <Grid.Row>
			        	<h1 className="postTitle">{this.state.postDetails['title']}</h1>
			        </Grid.Row>
					<PostInfo postBody={this.state.postDetails['body']} postAuthorImage = {this.state.postAuthorImage}  timeFromNow = {this.state.timeFromNow} genre={this.state.postGenre} author={this.state.postDetails['author']}/>
			    	<Grid.Row>
			    		<p>{ReactHtmlParser(this.state.postDetails['body'])}</p>
			    	</Grid.Row>
			    </Grid.Column>

			    <Grid.Column width={4}>
			    </Grid.Column>
			  </Grid>
			</div>
		)
	}
}
export default PostPage;