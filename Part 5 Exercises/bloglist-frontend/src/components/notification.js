import React from "react"
import '../index.css'

const Notification = ({message}) => {

  if (message == null) {
    return null
  } 

  return (
   <div id="notification" className="notification">{message}</div>
  )
}

export default Notification