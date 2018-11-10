import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import PostComponent from './Post/postComponent'

const ModalPreviewComponent = (props) => (
  <Modal trigger={<Button>Preview</Button>} centered={false}>
    <Modal.Content>
      <Modal.Description>
        <PostComponent userInfo={props.userInfo} postTitle={props.postTitle} postContent={props.postContent}/>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalPreviewComponent