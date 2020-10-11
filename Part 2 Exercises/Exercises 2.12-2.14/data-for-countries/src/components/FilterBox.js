import React from 'react'

const FilterBox = ({filterValue, handleFilterChange}) => {
    return (
        <div>
        find countries <input value={filterValue} onChange={handleFilterChange} />
        </div>
    )
}

export default FilterBox 