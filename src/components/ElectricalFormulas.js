import React, { useState } from 'react'
import InputFields from './InputFields' // Import the InputFields component
import ElectricalUnitConverter from './ElectricalUnitConverter' // Import the converter here

const ElectricalFormulas = () => {
  const [selectedFormula, setSelectedFormula] = useState('')
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [resistance, setResistance] = useState('')
  const [resistance2, setResistance2] = useState('') // Add state for resistance2
  const [result, setResult] = useState('')

  function formatEngineeringNotation(value) {
    const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E'] // Define the engineering prefixes
    const exponent = Math.floor(Math.log10(Math.abs(value)) / 3) // Determine the exponent
    const scaledValue = value / Math.pow(10, exponent * 3) // Scale the value
    const prefix = prefixes[exponent] // Get the appropriate prefix
    return `${scaledValue.toFixed(2)} ${prefix}` // Format the value with prefix
  }

  const handleFormulaChange = (e) => {
    const formula = e.target.value
    setSelectedFormula(formula)
    // Reset the input values when the formula changes
    setVoltage('')
    setCurrent('')
    setResistance('')
    setResistance2('') // Reset resistance2 when the formula changes
    // Reset the result when the formula changes
    setResult('')
  }

  const handleVoltageChange = (e) => {
    setVoltage(e.target.value)
  }

  const handleCurrentChange = (e) => {
    setCurrent(e.target.value)
  }

const handleResistanceChange = (e) => {
  const resistanceValue = e.target.value
  console.log('New resistance value:', resistanceValue)
  setResistance(resistanceValue)
  console.log('Resistance state:', resistance) // Add this console log statement
}



  const handleResistance2Change = (e) => {
    // Add change handler for resistance2
    setResistance2(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Calculate based on the selected formula
    let calculatedResult = ''

    switch (selectedFormula) {
      case 'series':
        calculatedResult = calculateSeriesCircuit()
        break
      case 'parallel':
        calculatedResult = calculateParallelCircuit()
        break
      case 'ohm':
        calculatedResult = calculateOhmsLaw()
        break
      case 'power':
        calculatedResult = calculatePowerLaw()
        break
      default:
        calculatedResult = ''
    }

    setResult(calculatedResult)
  }

  const calculateSeriesCircuit = () => {
    // Parse the input values as floats
    const r1 = parseFloat(resistance)
    const r2 = parseFloat(resistance2)

    // Check if any input is invalid
    if (isNaN(r1) || isNaN(r2)) {
      return 'Invalid input'
    }

    const totalResistance = r1 + r2 // Add resistance2 to the total resistance

    // Format the result using engineering notation
    const formattedResistance = formatEngineeringNotation(totalResistance)

    // Return the result as a formatted string
    return `Total Resistance (Ω) = ${formattedResistance}`
  }
const calculateParallelCircuit = () => {
  const r1 = parseFloat(resistance);
  const r2 = parseFloat(resistance2);

  if (isNaN(r1) || isNaN(r2)) {
    return 'Invalid input';
  }

  const totalResistance = 1 / ((1 / r1) + (1 / r2));
  const formattedResistance = formatEngineeringNotation(totalResistance);

  return `Total Resistance (Ω) = ${formattedResistance}`;
}

  const calculateOhmsLaw = () => {
    if (voltage && resistance) {
      const v = parseFloat(voltage)
      const r = parseFloat(resistance)
      const i = v / r
      return `Current (I) = ${formatEngineeringNotation(i)} A`
    } else if (voltage && current) {
      const v = parseFloat(voltage)
      const i = parseFloat(current)
      const r = v / i
      return `Resistance (Ω) = ${formatEngineeringNotation(r)}`
    } else if (current && resistance) {
      const i = parseFloat(current)
      const r = parseFloat(resistance)
      const v = i * r
      return `Voltage (V) = ${formatEngineeringNotation(v)} V`
    } else {
      return ''
    }
  }

  const calculatePowerLaw = () => {
    const v = parseFloat(voltage)
    const i = parseFloat(current)
    const p = v * i
    return `Power (P) = ${formatEngineeringNotation(p)} W`
  }

  return (
    <div>
      <h2>Electrical Formulas</h2>
      <select value={selectedFormula} onChange={handleFormulaChange}>
        <option value="">Select Formula</option>
        <option value="series">Series Circuits</option>
        <option value="parallel">Parallel Circuits</option>
        <option value="ohm">Ohm's Law</option>
        <option value="power">Power Law</option>
      </select>
      {selectedFormula && (
        <form onSubmit={handleSubmit}>
          <InputFields
            selectedFormula={selectedFormula}
            handleVoltageChange={handleVoltageChange}
            handleCurrentChange={handleCurrentChange}
            handleResistanceChange={handleResistanceChange}
            handleResistance2Change={handleResistance2Change} // Pass the change handler for resistance2
          />
          <button type="submit">Calculate</button>
        </form>
      )}
      {result && <p>Result: {result}</p>}
      <ElectricalUnitConverter />
    </div>
  )
}

export default ElectricalFormulas
