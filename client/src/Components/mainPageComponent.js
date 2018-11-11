import React, { Component } from 'react'
import axios from 'axios';
import HeaderComponent from './headerComponent'
import { Grid, Dropdown } from 'semantic-ui-react'
import "./mainPageComponent.css"


 
class MainPage extends Component {

state={
 options : [
  { key: 1, text: 'All Content', value: 1 },
  { key: 2, text: 'Enterpreneurshup & Business', value: 2 },
  { key: 3, text: 'Finance', value: 3 },
  { key: 4, text: 'Health & Fitness', value: 4},
  { key: 5, text: 'Leadership', value: 5 },
  { key: 6, text: 'Religion', value: 6 },
  { key: 7, text: 'Fiction', value: 7 }
]
}
 componentWillMount() {
 	if(this.props.location.state) {
 		this.state.userInfo=this.props.location.userInfo
 	}
 }

 
	render() {
		console.log(this.props.location.userInfo);
		return (
			<div>
				<HeaderComponent userInfo={this.props.location.userInfo} />
				   <Grid stackable>
				   <Grid.Row></Grid.Row>
				    <Grid.Row>
					    <Grid.Column width={6}></Grid.Column>
					    <Grid.Column width={1}><p>Hot</p></Grid.Column>
					    <Grid.Column width={1}><p>New</p></Grid.Column>
					    <Grid.Column width={1}><p>Trending</p></Grid.Column>
					    <Grid.Column width={1}></Grid.Column>
					    <Grid.Column width={3}>
		  				<Dropdown className="dropdown" defaultValue={this.state.options[0].value} inline options={this.state.options} />

					    </Grid.Column>

				    </Grid.Row>

				  </Grid>
            </div>
		)
	}
}
export default MainPage;