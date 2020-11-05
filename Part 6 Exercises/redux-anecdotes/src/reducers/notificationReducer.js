const initialState = { message: "" }

export const setNotification = (message, seconds) => {
	return async dispatch => {
		dispatch({ type: "SET_MESSAGE", data: { message } })
		setTimeout(() => {
			dispatch(removeNotification())
		}, seconds * 1000)
	}
}

export const removeNotification = () => {
	return {
		type: "SET_MESSAGE",
		data: { message: "" }
	}
}

const notificationReducer = (state = initialState, action) => {
	console.log("state now: ", state)
	console.log("action", action)

	switch (action.type) {
		case "SET_MESSAGE": {
			return { message: action.data.message }
		}
		default:
			return state
	}
}

export default notificationReducer
