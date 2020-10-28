import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "../components/Blog"

describe("<Blog /> tests", () => {
	let component

	beforeEach(() => {
		const blog = {
			author: "johnny",
			title: "Vice",
			url: "vice.com",
			likes: 5
		}

		component = render(<Blog blog={blog} />)
	})

	test("renders content", () => {
		expect(component.container).toHaveTextContent(`Vice`)
	})

	test("button click shows url and likes", () => {
		const shownText = component.container.querySelector('.buttonPressed')

		// extar info not displayed prior button to button press
		expect(shownText).toHaveStyle(
			"display: none"
		)

		const button = component.getByText("view")

		fireEvent.click(button)

		// extra info displayed after button press
		expect(shownText).toHaveStyle(
			""
		)
	})
})
