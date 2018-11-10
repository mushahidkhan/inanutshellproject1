import React, { Component } from 'react'
import { Menu, Input, Button, Modal } from 'semantic-ui-react'
import './header.css'
import { Link } from 'react-router-dom'



export default class NotLoggedInMenuComponent extends Component {

  state = {} 

  handleItemClick = (e, { name }) =>  {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
    	<div>
    	<Menu stackable  secondary className="menuClass">
         <Link to="/"><Menu.Item className="logoMenuItem">
          <h3 >In A Nutshell</h3>
         </Menu.Item>
         </Link>
          
          <Menu.Item className="search">
            <Input className='icon'icon='search' placeholder='Search...' />
           </Menu.Item>
           
           <Link to="/login" className="loginAndSignUp"> 
       <Menu.Item active={activeItem === 'writeAboutABook'} onClick={this.handleItemClick}>
           Write About a Book
          </Menu.Item>
        </Link>

       <Link to="/login" className="loginAndSignUp"> 
       <Menu.Item className="itema" active={activeItem === 'login'} onClick={this.handleItemClick}>
           Login Page
        </Menu.Item>
        </Link>
       <a href to="/https://signup.steemit.com/" className="loginAndSignUp">  <Menu.Item active={activeItem === 'signup'} onClick={this.handleItemClick}>
          Sign up
        </Menu.Item>
        </a>	
      </Menu>
      </div>

    )
  }
}