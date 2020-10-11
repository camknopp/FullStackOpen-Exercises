import React from 'react'

const PersonForm = ({handleSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={nameValue} onChange={nameOnChange}/>
            </div>
            <div>
                number: <input value={numberValue} onChange={numberOnChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}


export default PersonForm