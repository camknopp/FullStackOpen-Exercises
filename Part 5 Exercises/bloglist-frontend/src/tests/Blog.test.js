import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "../components/Blog"

describe("<Blog /> tests", () => {
	let component

	beforeEach(() => {
		const blog = {
			author: "johnny",
			title: "The cool blog",
			url: "Coolblog.com",
			likes: 5
		}

		component = render(<Blog blog={blog} />)
	})

	test("renders content", () => {
		expect(component.container).toHaveTextContent(`The cool blog`)
	})

	test("button click shows url and likes", () => {
		const shownText = component.container.querySelector(".buttonPressed")

		// extar info not displayed prior button to button press
		expect(shownText).toHaveStyle("display: none")

		const button = component.getByText("view")

		fireEvent.click(button)

		// extra info displayed after button press
		expect(shownText).toHaveStyle("")
	})

	test("like button event handler called twice", () => {
		const blog = {
			author: "johnny",
			title: "The cool blog",
			url: "Coolblog.com",
			likes: 5
		}

		component = render(<Blog blog={blog} />)

		const mockHandler = jest.fn()

		const button = component.getByText("view")

		fireEvent.click(button) // need to click this button first so that the like button is displayed

		const likeButton = component.container.querySelector(".likeButton") // get the like button by class name

		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
