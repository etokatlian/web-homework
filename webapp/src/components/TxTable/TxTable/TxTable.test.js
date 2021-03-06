import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../../network/apollo-client'

import TxTable from './TxTable'
import { RomanNumeralsContext } from '../../../context/romanNumeralsContext'

describe('Transactions Table', () => {
  const transactionsData = [
    {
      _id: '603eb17eab66959154d80f06',
      amount: 10000,
      createdAt: '2021-03-02',
      credit: false,
      debit: true,
      description: 'Food',
      __typename: 'Transaction'
    },
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

  test('Renders rows correctly', () => {
    const history = createMemoryHistory()
    const component = render(
      <ApolloProvider client={client}>
        <Router history={history}>
          <RomanNumeralsContext.Provider value={{ isRoman: false }}>
            <TxTable transactionsData={transactionsData} />
          </RomanNumeralsContext.Provider>
        </Router>
      </ApolloProvider>
    )
    component.getByText('Smashing Pumpkins tickets')
    component.getByTestId('transaction-603eb17eab66959154d80f06')
    component.getByTestId('transaction-603eb17eab66959154d80f07')
  })
})
