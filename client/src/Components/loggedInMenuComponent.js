import React, { Component } from 'react'
import { Menu, Input, Button, Modal } from 'semantic-ui-react'
import './header.css'
import { Link } from 'react-router-dom'


export default class LoggedInMenuComponent extends Component {
  
  state = {
  	userInfo: this.props.userInfo
  } 

  handleItemClick = (e, { name }) =>  {
    this.setState({ activeItem: name })
  }

  render() {
    const newTo = { 
  pathname: "/createPost", 
  userInfo: this.state.userInfo
};

   const home = { 
  pathname: "/", 
  userInfo: this.state.userInfo
};
  	    const { activeItem } = this.state
     return (
     <div>
    	<Menu stackable  secondary className="menuClass">
         <Link to={home}><Menu.Item className="logoMenuItem">
          <h3  className="menuItem" >In A Nutshell</h3>
         </Menu.Item>
         </Link>
          
          <Menu.Item className="search">
            <Input className='icon'icon='search' placeholder='Search...' />
           </Menu.Item>

           <Link to={newTo} className="loginAndSignUp" params={{ userInfo: this.state.userInfo }}> 
       <Menu.Item active={activeItem === 'writeAboutABook'} onClick={this.handleItemClick} >


           Write About a Book
          </Menu.Item>
        </Link>

       <Link to="/profile" className="loginAndSignUp"> 
       <Menu.Item active={activeItem === 'profile'} onClick={this.handleItemClick}>
        {this.state.userInfo.username}
        </Menu.Item>
        </Link>

       <Link to="/" className="loginAndSignUp"> 
       <Menu.Item  active={activeItem === 'logout'} onClick={this.handleItemClick}>
           Log out
        </Menu.Item>
        </Link>	
      </Menu>


     </div>
     )
     }
  }