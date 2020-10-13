import React from "react"
import './../index.css'

const ErrorMessage = ({message}) => {

  if (message == null) {
    return null
  } 
  console.log("notification of ", message)

  return (
   <div className="error">{message}</div>
  )
}

export default ErrorMessage
