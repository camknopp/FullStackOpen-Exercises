const initialState = { filter: "" }

export const setFilter = filter => {
	return {
		type: "SET_FILTER",
		data: { filter }
	}
}

const filterReducer = (state = initialState, action) => {
	console.log("state now: ", state)
	console.log("action", action)

	switch (action.type) {
		case "SET_FILTER": {
			return { filter: action.data.filter }
		}
		default:
			return state
	}
}

export default filterReducer
