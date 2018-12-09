import React from 'react';
import { Image, Divider } from 'semantic-ui-react'
import './post.css'

const postInfo = (props) => {
	console.log(props.postAuthorImage)
 return (
	 <div>
	 	  <Image className="postAuthorImage" verticalAlign='middle' src={props.postAuthorImage} size='mini' circular />
	 	  <span className="postInfo"><strong>{props.author}</strong> <span className="postGenre">in <strong>{props.genre}</strong> </span> <span className="postTimeFromNow"> <span className="dot">•&nbsp;</span>{props.timeFromNow}</span></span>
			<Divider />
	 </div>
	)
};

export default postInfo;