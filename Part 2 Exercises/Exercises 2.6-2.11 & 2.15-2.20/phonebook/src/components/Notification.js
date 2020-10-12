import React from "react"

const Notification = message => {
  if (message == null) {
    return null
  } 
  console.log("notification of ", message)

  return (
  <div>{message}</div>
  )
}

export default Notification
