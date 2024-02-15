import React, { useState } from 'react'

const ElectricalUnitConverter = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputExponent, setInputExponent] = useState('0') // Default to no exponent
  const [inputUnit, setInputUnit] = useState('')
  const [outputUnit, setOutputUnit] = useState('')
  const [additionalParam, setAdditionalParam] = useState('')
  const [result, setResult] = useState('')

  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleExponentChange = (e) => setInputExponent(e.target.value)
  const handleInputUnitChange = (e) => setInputUnit(e.target.value)
  const handleOutputUnitChange = (e) => setOutputUnit(e.target.value)
  const handleAdditionalParamChange = (e) => setAdditionalParam(e.target.value)

  const convertUnits = () => {
    // Convert inputValue according to the exponent to get the actual value
    const actualValue =
      parseFloat(inputValue) * Math.pow(10, parseInt(inputExponent, 10))
    let conversionResult = null

    if (isNaN(actualValue) || isNaN(parseFloat(additionalParam))) {
      setResult('Invalid input')
      return
    }

    // Conversion logic
    if (inputUnit === 'A' && outputUnit === 'W') {
      // Convert Amps to Watts (requires additional parameter: Voltage)
      const voltage = parseFloat(additionalParam)
      conversionResult = actualValue * voltage
    } else if (inputUnit === 'V' && outputUnit === 'W') {
      // Convert Volts to Watts (requires additional parameter: Current)
      const current = parseFloat(additionalParam)
      conversionResult = actualValue * current
    } else if (inputUnit === 'W' && outputUnit === 'A') {
      // Convert Watts to Amps (requires additional parameter: Voltage)
      const voltage = parseFloat(additionalParam)
      conversionResult = actualValue / voltage
    } else if (inputUnit === 'W' && outputUnit === 'V') {
      // Convert Watts to Volts (requires additional parameter: Current)
      const current = parseFloat(additionalParam)
      conversionResult = actualValue / current
    }
    // Add more conversion logic here as needed

    if (conversionResult !== null) {
      setResult(`${conversionResult.toFixed(2)} ${outputUnit}`)
    } else {
      setResult('Conversion not supported or invalid input')
    }
  }

  return (
    <div>
      <h2>Electrical Unit Converter</h2>
      <label>
        Value:
        <input type="number" value={inputValue} onChange={handleInputChange} />
      </label>
      <label>
        Exponent (e.g., -3 for milli, 3 for kilo):
        <input
          type="number"
          value={inputExponent}
          onChange={handleExponentChange}
        />
      </label>
      <label>
        From Unit:
        <select value={inputUnit} onChange={handleInputUnitChange}>
          <option value="">Select Unit</option>
          <option value="A">Amps (A)</option>
          <option value="V">Volts (V)</option>
          <option value="W">Watts (W)</option>
          {/* Add more units as needed */}
        </select>
      </label>
      <label>
        To Unit:
        <select value={outputUnit} onChange={handleOutputUnitChange}>
          <option value="">Select Unit</option>
          <option value="A">Amps (A)</option>
          <option value="V">Volts (V)</option>
          <option value="W">Watts (W)</option>
          {/* Add more units as needed */}
        </select>
      </label>
      <label>
        Additional Parameter (e.g., Voltage for converting Amps to Watts):
        <input
          type="number"
          value={additionalParam}
          onChange={handleAdditionalParamChange}
        />
      </label>
      <button onClick={convertUnits}>Convert</button>
      <div>Result: {result}</div>
    </div>
  )
}

export default ElectricalUnitConverter
