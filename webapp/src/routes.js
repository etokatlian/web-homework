import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Container from '@material-ui/core/Container'
import { Home, Transactions, TransactionsCreate, TransactionEdit, Metrics } from './pages'
import { AppBar } from './components/shared'

function AppRouter () {
  return (
    <Router>
      <AppBar />
      <Container>
        <div css={layoutStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
          <Route component={TransactionEdit} exact path='/transactions/:id/edit' />
          <Route component={TransactionsCreate} exact path='/transactions/create' />
          <Route component={Metrics} exact path='/transactions/metrics' />
        </div>
      </Container>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`
