// App.js
import React, { useState } from 'react'
import './App.css'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ElectricalFormulas from './components/ElectricalFormulas'
function App() {
  const categories = [
    { name: 'Mechanical', formulas: ['Formula 1', 'Formula 2', 'Formula 3'] },
    { name: 'Pneumatics', formulas: ['Formula A', 'Formula B', 'Formula C'] },
    { name: 'Hydraulics', formulas: ['Formula X', 'Formula Y', 'Formula Z'] },
    {
      name: 'Electrical',
      formulas: [
        'Series Circuits',
        'Parallel Circuits',
        "Ohm's Law",
        'Power Law',
      ],
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFormula, setSelectedFormula] = useState('')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedFormula('')
  }

  const handleFormulaChange = (formula) => {
    setSelectedFormula(formula)
  }

  return (
    <div className="App">
      <h1>Engineering Calculator</h1>
      <Tabs>
        <TabList>
          {categories.map((category) => (
            <Tab
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </Tab>
          ))}
        </TabList>
        {categories.map((category) => (
          <TabPanel key={category.name}>
            {selectedCategory === category.name && (
              <div>
                <h2>{category.name}</h2>
                <div>
                  {category.formulas.map((formula) => (
                    <div
                      key={formula}
                      onClick={() => handleFormulaChange(formula)}
                    >
                      {formula}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
      {selectedCategory === 'Electrical' && selectedFormula && (
        <ElectricalFormulas selectedFormula={selectedFormula} />
      )}
    </div>
  )
}

export default App
