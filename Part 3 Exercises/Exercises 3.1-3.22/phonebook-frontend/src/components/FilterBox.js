import React from 'react'

const FilterBox = ({filterValue, handleFilterChange}) => {
    return (
        <div>
        filter shown with <input value={filterValue} onChange={handleFilterChange} />
        </div>
    )
}

export default FilterBox 