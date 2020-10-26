import React from 'react'

const CreateForm = ({ handleCreate, title, setTitle, author, setAuthor, url, setUrl }) => {
	return (
		<form onSubmit={handleCreate}>
			title:{" "}
			<input
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			></input>
			<br></br>
			author:
			<input
				type="text"
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
			></input>
			<br></br>
			url:
			<input
				type="text"
				value={url}
				onChange={({ target }) => setUrl(target.value)}
			></input>
			<br></br>
			<button type="submit">create</button>
		</form>
	)
}

export default CreateForm
