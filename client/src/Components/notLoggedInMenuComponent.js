import React, { Component } from 'react'
import { Menu, Input, Button, Modal, Dropdown } from 'semantic-ui-react'
import './header.css'
import { Link } from 'react-router-dom'



export default class NotLoggedInMenuComponent extends Component {

  state = {
    activeItem: "new"
  } 

  handleItemClick = (e, { name }) =>  {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
    	<div>
    	<Menu stackable  secondary className="menuClass">
         <Link to="/">
           <Menu.Item  className="logoMenuItem">
            <h3 >In A Nutshell</h3>
           </Menu.Item>
         </Link>
        
           <Link to="/login" className="loginAndSignUp"> 
       <Menu.Item name='writeAboutABook' active={activeItem === 'writeAboutABook'} onClick={this.handleItemClick}>
           <p>Write About a Book</p>
          </Menu.Item>

        </Link>
          <Menu.Item className="search">
            <Input className='icon'icon='search' placeholder='Search...' />
           </Menu.Item>

       <Link to="/login" className="loginAndSignUp"> 
       <Menu.Item name='login' className="itema" active={activeItem === 'login'} onClick={this.handleItemClick}>
          <p> Login Page</p>
        </Menu.Item>
        </Link>

        <a href="https://signup.steemit.com/" className="loginAndSignUp"> 
         <Menu.Item>
           <p> Sign up</p>
           </Menu.Item>
         </a>
      </Menu>
      </div>

    )
  }
}