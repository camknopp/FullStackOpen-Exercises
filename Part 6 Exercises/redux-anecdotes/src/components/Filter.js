import React from "react"
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const filterChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

	return (
		<div>
			<input onChange={filterChange} />
		</div>
	)
}

export default Filter
