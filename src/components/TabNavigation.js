// TabNavigation.js
import React from 'react'

function TabNavigation({ categories, onCategoryChange, onFormulaChange }) {
  return (
    <div className="tab-navigation">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </div>
      ))}
    </div>
  )
}

export default TabNavigation
