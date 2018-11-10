import React, { Component } from 'react'
import axios from 'axios';
import HeaderComponent from './headerComponent'



 
class MainPage extends Component {
	state={
		username:"",
		imageUrl:""
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
            </div>
		)
	}
}
export default MainPage;