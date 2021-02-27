import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import Container from '@material-ui/core/Container'
import { Home, Transactions, TransactionsCreate, TransactionEdit } from './pages'

function AppRouter () {
  return (
    <Router>
      <Container>
        <div css={layoutStyle}>
          <nav css={navStyle}>
            <ul >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/transactions'>Transactions</Link>
              </li>
              <li>
                <Link to='/transactions/create'>Transaction Entry</Link>
              </li>
            </ul>
          </nav>
          <div className='main-content' css={contentStyle}>
            <Route component={Home} exact path='/' />
            <Route component={Transactions} exact path='/transactions' />
            <Route component={TransactionEdit} exact path='/transaction/:id/edit' />
            <Route component={TransactionsCreate} exact path='/transactions/create' />
          </div>
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

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
