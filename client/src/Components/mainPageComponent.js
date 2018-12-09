import React, { Component } from 'react'
import axios from 'axios';
import HeaderComponent from './headerComponent'
import { Grid, Dropdown, Button, Input, Label, Menu } from 'semantic-ui-react'
import "./mainPageComponent.css"
import steem from 'steem'
import ListOfPostsLook from './Post/listOfPostsLook'
import './mainPageComponent.css'

 
class MainPage extends Component {
	state = {
		 genrePicked:'1',
		 filterPicked: '1',
		 genreOptions : [
		  { key: 1, text: 'All Content', value: 1 },
		  { key: 2, text: 'Business', value: 2 },
		  { key: 3, text: 'Finance', value: 3 },
		  { key: 4, text: 'Health & Fitness', value: 4},
		  { key: 5, text: 'Leadership', value: 5 },
		  { key: 6, text: 'Religion', value: 6 },
		  { key: 7, text: 'Fiction', value: 7 }
		],

		filterOptions : [
		  { key: 1, text: 'New', value: 1 },
		  { key: 2, text: 'Trending', value: 2 },
		  { key: 3, text: 'Hot', value: 3 }
		]

	}

 componentWillMount() {
 	if(this.props.location.state) {
 		this.state.userInfo = this.props.location.userInfo
 	}
 		if(this.props.location.activeItem){
 	 		console.log(this.props)		
 		}
  }
	
	 onFilterChange = (n, e) => {
	 	console.log(e.value)
	 	this.setState({ filterPicked: e.value}); 
	 }

	 onGenreChange = (n, e) => {
	 	this.setState({ genrePicked: e.value}); 
	 	console.log(this.state.genrePicked)
	 }

	render() {

		return (
			<div>
			<HeaderComponent userInfo={this.props.location.userInfo} className="header"/>
			<div className="mainPage">
			  <Grid stackable>
			    <Grid.Row columns={3}>
			      <Grid.Column>
      				<Dropdown onChange={this.onGenreChange} defaultValue={this.state.genreOptions[0].value} search selection options={this.state.genreOptions} className="options"/>
			      </Grid.Column>
			    </Grid.Row>
			    <Grid.Row >
			      <Grid.Column>
					 	<ListOfPostsLook genrePicked={this.state.genrePicked}/>
			      </Grid.Column>
			    </Grid.Row>
			  </Grid>
				</div>
			 </div>

		)
	}
}
export default MainPage;