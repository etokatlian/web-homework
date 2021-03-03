import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../../network/apollo-client'

import TxTableRow from './TxTableRow'
import { RomanNumeralsContext } from '../../../context/romanNumeralsContext'

describe('Transactions Table', () => {
  const transactionsData = [
    {
      _id: '603eb17eab66959154d80f07',
      amount: 9910,
      createdAt: '2021-03-01',
      credit: true,
      debit: false,
      description: 'Smashing Pumpkins tickets',
      __typename: 'Transaction'
    }
  ]

  test('Render Roman numerals correctly', () => {
    const history = createMemoryHistory()
    const component = render(
      <ApolloProvider client={client}>
        <Router history={history}>
          <RomanNumeralsContext.Provider value={{ isRoman: true }}>
            <TxTableRow transaction={transactionsData[0]} />
          </RomanNumeralsContext.Provider>
        </Router>
      </ApolloProvider>
    )
    expect(component.getByTestId('transaction-603eb17eab66959154d80f07-amount')).toHaveTextContent('$XCIX')
  })
})
