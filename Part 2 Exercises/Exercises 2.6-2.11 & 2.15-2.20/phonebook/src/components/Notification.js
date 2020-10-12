import React from "react"
import './../index.css'

const Notification = ({message}) => {

  if (message == null) {
    return null
  } 
  console.log("notification of ", message)

  return (
   <div className="notification">{message}</div>
  )
}

export default Notification
