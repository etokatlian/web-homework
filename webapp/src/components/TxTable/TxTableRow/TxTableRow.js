import React from 'react'
import { string, bool, number, shape, func } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import styled from '@emotion/styled'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Collapse from '@material-ui/core/Collapse'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Box from '@material-ui/core/Box'
import TableHead from '@material-ui/core/TableHead'

import { TxTableMenu } from '../TxTableMenu'

const StyledTableRow = styled(({ ...rest }) => (
  <TableRow {...rest} />
))`
  ${'*'} {
    border-bottom: unset
  }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const TxTableRow = ({ transaction, history }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <StyledTableRow data-testid={`transaction-${transaction._id}`} hover key={`transaction-${transaction._id}`}>
        <TableCell>
          <IconButton aria-label='expand row' onClick={() => setOpen(!open)} size='small'>
            {open ? <KeyboardArrowUpIcon data-testid='up-icon' /> : <KeyboardArrowDownIcon data-testid='down-icon' />}
          </IconButton>
        </TableCell>
        {/* <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'id')}>{transaction._id}</TableCell> */}
        {/* <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'userId')}>{transaction.userId}</TableCell> */}
        <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'description')}>{transaction.description}</TableCell>
        {/* <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'merchant')}>{transaction.merchantId}</TableCell> */}
        {/* <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'debit')}>{transaction.debit}</TableCell>
        <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'credit')}>{transaction.credit}</TableCell> */}
        <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'paymentType')}>{transaction.debit ? 'Debit' : 'Credit'}</TableCell>
        <TableCell align='right' data-testid={makeDataTestId(transaction._id, 'amount')}>${transaction.amount}</TableCell>
        <TableCell align='right'>
          <TxTableMenu history={history} transactionId={transaction._id} />
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              {/* <Typography component='div' gutterBottom variant='h6'>
                History
              </Typography> */}
              <Table aria-label='purchases' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Merchant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      {transaction.user_id} User Id 1
                    </TableCell>
                    <TableCell>{transaction.merchantId} Merchant Id 1</TableCell>
                    {/* <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  )
}

TxTableRow.propTypes = {
  history: shape({
    push: func
  }),
  transaction: shape({
    amount: number,
    credit: bool,
    debit: bool,
    description: string,
    _id: string
  })
}

export default TxTableRow
