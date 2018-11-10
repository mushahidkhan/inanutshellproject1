import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Input, Button, Header, Image, Modal} from 'semantic-ui-react'
import axios from 'axios';

class PreviewPost extends Component {
 
	render() {

		return (
			<div>
				<Button primary>Submit</Button>
		         <Modal trigger={<Button>Preview</Button>}>
		            <Modal.Content image>
		              <Modal.Description>
		                <Header>{this.props.bookTitle}</Header>

		                <p>{this.props.postTitle}</p>
		                <p>{this.props.body}</p>
		              </Modal.Description>
		            </Modal.Content>
		        </Modal>
			</div>

		)
	}
}
export default PreviewPost;