import React from "react"
import '../index.css'

const ErrorMessage = ({message}) => {

  if (message == null) {
    return null
  } 

  return (
   <div id="errorMessage" className="error">{message}</div>
  )
}

export default ErrorMessage
