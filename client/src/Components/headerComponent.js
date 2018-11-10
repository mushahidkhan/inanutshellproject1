import React, { Component } from 'react'
import { Menu, Input, Button, Modal } from 'semantic-ui-react'
import './header.css'
import NotLoggedInMenuComponent from './notLoggedInMenuComponent'
import LoggedInMenuComponent from './loggedInMenuComponent'


export default class HeaderComponent extends Component {

  render() {
     if(!this.props.userInfo) {
      return (
        <NotLoggedInMenuComponent />
      )
     } else {
      return (
      <LoggedInMenuComponent userInfo={this.props.userInfo} />
      )
     }
  }
}