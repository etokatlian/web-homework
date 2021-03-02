import React, { createContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { element, arrayOf } from 'prop-types'

import { TRANSACTIONS_CREATE_PATH, TRANSACTIONS_EDIT_PATH } from '../constants'

const RomanNumeralsContext = createContext()
const { Provider } = RomanNumeralsContext

const RomanNumeralsProvider = ({ children }) => {
  const { pathname } = useLocation()
  const [isRoman, setIsRoman] = useState(false)

  const isRomanDisabled = pathname.includes(TRANSACTIONS_CREATE_PATH) || pathname.includes(TRANSACTIONS_EDIT_PATH)

  return (
    <Provider value={{ isRoman, setIsRoman, isRomanDisabled }}>
      {children}
    </Provider>
  )
}

RomanNumeralsProvider.propTypes = {
  children: arrayOf(element)
}

export { RomanNumeralsContext, RomanNumeralsProvider }
