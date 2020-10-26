import React from "react"
import '../index.css'

const ErrorMessage = ({message}) => {

  if (message == null) {
    return null
  } 

  return (
   <div className="error">{message}</div>
  )
}

export default ErrorMessage
