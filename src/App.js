import React, { useEffect, useState } from 'react'
import Photo from './components/Photo'

const App = () => {
	const [photos, setPhotos] = useState([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const apiKey = `7JFNth6K1osaKTb0JrlYrpCxgYgZoSIvPlIsXOJCnDE`

	const fetchImage = async () => {
		setIsLoading(true)
		try {
			const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`

			const response = await fetch(apiUrl)
			const data = await response.json()
			setPhotos((prevData) => {
				return [...prevData, ...data]
			})
		} catch (error) {
			console.log(error)
		}
		setIsLoading()
	}

	useEffect(() => {
		fetchImage()
		// eslint-disable-next-line
	}, [page])

	useEffect(() => {
		const event = window.addEventListener('scroll', () => {
			if (
				window.innerHeight + window.scrollY >
					document.body.offsetHeight - 500 &&
				!isLoading
			) {
				setPage((prevPage) => prevPage + 1)
			}
		})
		return () => window.removeEventListener('scroll', event)
		// eslint-disable-next-line
	}, [])

	return (
		<main>
			<h1>Infinite Scroll Photo | Unsplash API</h1>
			<section className='photos'>
				<div className='display-photo'>
					{photos.map((data, index) => {
						return <Photo key={index} {...data} />
					})}
				</div>
			</section>
		</main>
	)
}

export default App
