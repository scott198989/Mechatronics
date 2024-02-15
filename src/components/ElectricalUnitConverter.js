import React, { useState } from 'react';

const ElectricalUnitConverter = () => {
  const [value, setValue] = useState('')
  const [exponent, setExponent] = useState('')
  const [currentUnit, setCurrentUnit] = useState('')
  const [targetUnit, setTargetUnit] = useState('')
  const [additionalParameter, setAdditionalParameter] = useState('')
  const [result, setResult] = useState('')

  const handleValueChange = (e) => setValue(e.target.value)
  const handleExponentChange = (e) => setExponent(e.target.value)
  const handleCurrentUnitChange = (e) => setCurrentUnit(e.target.value)
  const handleTargetUnitChange = (e) => setTargetUnit(e.target.value)
  const handleAdditionalParameterChange = (e) =>
    setAdditionalParameter(e.target.value)

  // Define this function at the top level of your component
  const isAdditionalParameterNeeded = () => {
    return (
      (currentUnit === 'A' && targetUnit === 'W') ||
      (currentUnit === 'V' && (targetUnit === 'W' || targetUnit === 'A')) ||
      (currentUnit === 'W' && (targetUnit === 'A' || targetUnit === 'V'))
    )
  }

  const convertValue = () => {
    if (value.trim() === '' || exponent.trim() === '') {
      setResult('Please enter both a value and an exponent.')
      return
    }

    const numericValue =
      parseFloat(value) * Math.pow(10, parseInt(exponent, 10))
    if (isNaN(numericValue)) {
      setResult('Invalid number input.')
      return
    }

    let convertedValue = null

    switch (currentUnit) {
      case 'A':
        if (targetUnit === 'W' && additionalParameter) {
          const voltage = parseFloat(additionalParameter)
          if (!isNaN(voltage) && voltage !== 0) {
            convertedValue = numericValue * voltage
          }
        }
        break
      case 'V':
        if (targetUnit === 'W' && additionalParameter) {
          const current = parseFloat(additionalParameter)
          if (!isNaN(current) && current !== 0) {
            convertedValue = numericValue * current
          }
        } else if (targetUnit === 'A' && additionalParameter) {
          const resistance = parseFloat(additionalParameter)
          if (!isNaN(resistance) && resistance !== 0) {
            convertedValue = numericValue / resistance
          }
        }
        break
      case 'W':
        if (targetUnit === 'A' && additionalParameter) {
          const voltage = parseFloat(additionalParameter)
          if (!isNaN(voltage) && voltage !== 0) {
            convertedValue = numericValue / voltage
          }
        } else if (targetUnit === 'V' && additionalParameter) {
          const current = parseFloat(additionalParameter)
          if (!isNaN(current) && current !== 0) {
            convertedValue = numericValue / current
          }
        }
        break
      // Add additional cases as needed
    }

    if (convertedValue !== null) {
      const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E']
      let unitExponent = 0
      while (convertedValue >= 1000) {
        convertedValue /= 1000
        unitExponent++
      }
      while (convertedValue < 1 && convertedValue > 0) {
        convertedValue *= 1000
        unitExponent--
      }
      const prefix = prefixes[unitExponent + 3] || ''
      setResult(`${convertedValue.toFixed(2)} ${prefix}${targetUnit}`)
    } else {
      setResult('Conversion not possible with the given units or input.')
    }
  }

  return (
  <div>
    <h2>Electrical Unit Converter</h2>
    <input
      type="number"
      value={value}
      onChange={handleValueChange}
      placeholder="Value"
    />
    <input
      type="number"
      value={exponent}
      onChange={handleExponentChange}
      placeholder="Exponent (e.g., -3 for milli, 3 for kilo)"
    />
    <select value={currentUnit} onChange={handleCurrentUnitChange}>
      <option value="">From Unit</option>
      <option value="A">Amps (A)</option>
      <option value="V">Volts (V)</option>
      <option value="W">Watts (W)</option>
      <option value="Ω">Ohms (Ω)</option>
      {/* Add more unit options as needed */}
    </select>
    <select value={targetUnit} onChange={handleTargetUnitChange}>
      <option value="">To Unit</option>
      <option value="A">Amps (A)</option>
      <option value="V">Volts (V)</option>
      <option value="W">Watts (W)</option>
      <option value="Ω">Ohms (Ω)</option>
      {/* Add more target unit options as needed */}
    </select>
    {isAdditionalParameterNeeded(currentUnit, targetUnit) && (
      <input
        type="number"
        value={additionalParameter}
        onChange={handleAdditionalParameterChange}
        placeholder="Additional Parameter (e.g., Voltage for converting Amps to Watts)"
      />
    )}
    <button onClick={convertValue}>Convert</button>
    <div>Result: {result}</div>
  </div>
)}
export default ElectricalUnitConverter 