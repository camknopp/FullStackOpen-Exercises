import deepFreeze from "deep-freeze"
import counterReducer from "./reducer"

describe("unicafe reducer", () => {
	const initialState = {
		good: 0,
		ok: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
	}

	test("should return a proper initial state when called with undefined state", () => {
		const state = {}
		const action = {
			type: "DO_NOTHING"
		}

		const newState = counterReducer(undefined, action)
		expect(newState).toEqual(initialState)
	})

	test("good is incremented", () => {
		const action = {
			type: "GOOD"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 1,
			ok: 0,
      bad: 0,
      all: 1,
      average: 1,
      positive: 1
		})
	})

	test("ok is incremented", () => {
		const action = {
			type: "OK"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 1,
      bad: 0,
      all: 1,
      average: 0,
      positive: 0
		})
	})

	test("bad is incremented", () => {
		const action = {
			type: "BAD"
		}
		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 0,
      bad: 1,
      all: 1,
      average: -1,
      positive: 0
		})
  })
  

	test("state is zeroed", () => {
		const action = {
			type: "ZERO"
		}
		const state = {
      good: 5,
      ok: 23434,
      bad: 2342342,
      all: 13413423432,
      average: 23423423,
      positive: 1313312
    }

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 0,
      bad: 0,
      all: 0,
      average: 0,
      positive: 0
		})
	})
})
