import React from 'react'
import ElectricalFormulas from './ElectricalFormulas'

const InputFields = ({
  selectedFormula,
  handleVoltageChange,
  handleCurrentChange,
  handleResistanceChange,
  handleResistance1Change, // Corrected this prop name
  handleResistance2Change,
}) => {
  return (
    <div>
      {selectedFormula === 'series' && (
        <div>
          <input
            type="text"
            onChange={handleResistanceChange}
            placeholder="Resistance 1 (e.g., 100)"
          />
          <input
            type="text"
            onChange={handleResistance2Change}
            placeholder="Resistance 2 (e.g., 200)"
          />
        </div>
      )}
      {selectedFormula === 'parallel' && (
        <div>
          <input
            type="text"
            onChange={handleResistanceChange} // Corrected to match the prop passed
            placeholder="Resistance 1 (e.g., 100)"
          />
          <input
            type="text"
            onChange={handleResistance2Change}
            placeholder="Resistance 2 (e.g., 200)"
          />
        </div>
      )}

      {selectedFormula === 'ohm' && (
        <div>
          <input
            type="text"
            onChange={handleCurrentChange}
            placeholder="Current (e.g., 0.5)"
          />
          <input
            type="text"
            onChange={handleResistanceChange}
            placeholder="Resistance (e.g., 100)"
          />
        </div>
      )}
      {selectedFormula === 'power' && (
        <div>
          <input
            type="text"
            onChange={handleVoltageChange}
            placeholder="Voltage (e.g., 12)"
          />
          <input
            type="text"
            onChange={handleCurrentChange}
            placeholder="Current (e.g., 0.5)"
          />
        </div>
      )}
    </div>
  )
}

export default InputFields
