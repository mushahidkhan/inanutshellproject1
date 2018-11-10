import React, { Component } from 'react'
import HeaderComponent from './headerComponent'
import { Grid } from 'semantic-ui-react'
import { Input, Form, Button } from 'semantic-ui-react'
import axios from 'axios';
import './login.css'

class LoginComponent extends Component {
	componentDidMount() {
	}

	logUserIn=()=> {
		axios.post('/login', {username: this.state.username, password: this.state.password})
 		 .then(response => {
 		 	if(response) {
 		 		console.log("MUSHHAI " + response.data.posting)
				this.props.history.push({
				  pathname: '/',
				  userInfo: response.data
				})
 		 	}
     	}
  )
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value});
 	}

handlePassword = (e) => {
		this.setState({ password: e.target.value});
	}
	state ={
		username:''
	}

	render() {
		return (
			<div>
 			<HeaderComponent/>
 			<Grid centered columns={16} className="loginArea">
				<Grid.Column width={8}>
				  <Form>
				    <Form.Field>
				      <input type="text" onChange={this.handleUsername.bind(this)} value={this.state.username} placeholder='Username' className="inputArea"/>
				    </Form.Field>
				    <Form.Field>
				      <input  onChange={this.handlePassword.bind(this)} value={this.state.password} placeholder='Password' className="inputArea"/>
				    </Form.Field>
				    <Button primary onClick={this.logUserIn}  className="inputArea">Login</Button>
				  </Form>
				  </Grid.Column>
			  </Grid>
			  </div>
 		)
	}
}
export default LoginComponent;