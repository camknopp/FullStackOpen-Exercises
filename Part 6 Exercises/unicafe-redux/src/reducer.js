const initialState = {
	good: 0,
	ok: 0,
	bad: 0,
	all: 0,
	average: 0,
	positive: 0
}

const computeAverage = (good, bad, neutral) => {
  console.log("computing average: for (good, bad, neutral)", good, bad, neutral)

  if (good + bad + neutral === 0) {
    return 0
  }
	return (good + bad * -1) / (good + bad + neutral)
}

const computePercentPositive = (good, bad, neutral) => {
  if (good + bad + neutral === 0) {
    return 0
  }
	return good / (good + bad + neutral)
}

const counterReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case "GOOD":
			return {
				good: state.good + 1,
				ok: state.ok,
				bad: state.bad,
				all: state.good + 1 + state.ok + +state.bad,
				average: computeAverage(state.good + 1, state.bad, state.ok),
				positive: computePercentPositive(
					state.good + 1,
					state.bad,
					state.ok
				)
			}
		case "OK":
			return {
				good: state.good,
				ok: state.ok + 1,
				bad: state.bad,
				all: state.good + (state.ok + 1) + state.bad,
				average: computeAverage(state.good, state.bad, state.ok + 1),
				positive: computePercentPositive(
					state.good,
					state.bad,
					state.ok + 1
				)
			}
		case "BAD":
			return {
				good: state.good,
				ok: state.ok,
				bad: state.bad + 1,
				all: state.good + state.ok + (state.bad + 1),
				average: computeAverage(state.good, state.bad + 1, state.ok),
				positive: computePercentPositive(
					state.good,
					state.bad + 1,
					state.ok
				)
			}
		case "ZERO":
			return {
				good: 0,
				ok: 0,
				bad: 0,
				all: 0,
				average: 0,
				positive: 0
			}
		default:
			return state
	}
}

export default counterReducer
