import React, { Component } from 'react'
import HeaderComponent from './headerComponent'
import { Grid } from 'semantic-ui-react'
import { Input, Form, Button } from 'semantic-ui-react'
import axios from 'axios';
import './login.css'

class LoginComponent extends Component {
	state={
		error:''
	}
	componentDidMount() {
	}

	logUserIn=()=> {
		axios.post('/login', {username: this.state.username, password: this.state.password})
 		 .then(response => {
 		 	if(!response.data.error) {
				this.props.history.push({
				  pathname: '/',
				  userInfo: response.data
				})
 		 	} else {
 		 		this.setState({error: response.data.error})
 		 		console.log(this.state.error)

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
	state = {
		username:''
	}

showErrorMessage = () => {
	console.log("asdf")
	if(this.state.error.length > 0) {
		alert(this.state.error)
		return( <p>{this.state.error.error}</p>)
	}
}

	render() {
		return (
			<div>
 			<HeaderComponent/>
 			<Grid centered columns={16} className="loginArea">
				<Grid.Column width={8}>
				  <Form>
				    <Form.Field>
				    <p className="error">{this.state.error}</p>
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