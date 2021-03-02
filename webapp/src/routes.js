import React from 'react'
import styled from '@emotion/styled'
import Container from '@material-ui/core/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Transactions, TransactionsCreate, TransactionEdit, Metrics } from './pages'
import { AppBar } from './components/shared'
import { RomanNumeralsProvider } from './context/romanNumeralsContext'

const StyledRouteWrapper = styled.div`
  display: grid;
  grid-row-gap: 24px;
  padding: 8px;
`

function AppRouter () {
  return (
    <Router>
      <RomanNumeralsProvider>
        <AppBar />
        <Container>
          <StyledRouteWrapper>
            <Route component={Home} exact path='/' />
            <Route component={Transactions} exact path='/transactions' />
            <Route component={TransactionEdit} exact path='/transactions/:id/edit' />
            <Route component={TransactionsCreate} exact path='/transactions/create' />
            <Route component={Metrics} exact path='/transactions/metrics' />
          </StyledRouteWrapper>
        </Container>
      </RomanNumeralsProvider>
    </Router>
  )
}

export default AppRouter
