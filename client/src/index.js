import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import HomePage from './Components/mainPageComponent'
import LoginComponent from './Components/loginComponent'
import createPostComponent from './Components/createPostComponent'
import PostPage from './Components/Post/postPage'

import test from './Components/Post/listOfPostsLook'

import Post from './Components/Post/postComponent'

 const App = () => {
		return (
			<BrowserRouter>
				<div>
 					<Route path="/" exact component = {HomePage}/>
 					<Route path="/login" component = {LoginComponent}/>
 					<Route path="/createPost" component = {createPostComponent}/>
 					<Route path="/post/:author/:permLink" component = {PostPage}/>

				</div>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));

