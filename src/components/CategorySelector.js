import React from 'react'
import InputFields from './InputFields' // Import the InputFields component
import ElectricalFormulas from './ElectricalFormulas'

function CategorySelector({
  categories,
  onCategoryChange,
  onFormulaChange,
  selectedFormula,
  handleVoltageChange, // Add handleVoltageChange as a prop
  handleCurrentChange, // Add handleCurrentChange as a prop
  handleResistanceChange, // Add handleResistanceChange as a prop
}) {
  // Function to handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value
    onCategoryChange(category)
    // Reset formula selection when changing category
    onFormulaChange('')
  }

  // Function to handle formula change
  const handleFormulaChange = (e) => {
    const formula = e.target.value
    onFormulaChange(formula)
  }

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <h3>{category.name}</h3>
          <select onChange={handleFormulaChange}>
            <option value="">Select Formula</option>
            {category.formulas.map((formula, idx) => (
              <option key={idx} value={formula}>
                {formula}
              </option>
            ))}
          </select>
          {/* Conditionally render InputFields component when a formula is selected */}
          {selectedFormula && (
            <InputFields
              selectedFormula={selectedFormula}
              handleVoltageChange={handleVoltageChange} // Pass the event handlers
              handleCurrentChange={handleCurrentChange} // Pass the event handlers
              handleResistanceChange={handleResistanceChange} // Pass the event handlers
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default CategorySelector
