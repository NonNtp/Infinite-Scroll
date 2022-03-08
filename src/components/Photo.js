import React from 'react'

const Photo = (props) => {
	const {
		urls: { regular },
	} = props

	return (
		<div className='single-photo'>
			<img src={regular} alt={props.alt_description} />
		</div>
	)
}

export default Photo
