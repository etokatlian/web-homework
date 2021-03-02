import React, { useContext } from 'react'
import { string, bool, number, shape } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
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
import { RomanNumeralsContext } from '../../../context/romanNumeralsContext'
import { integerToRoman } from '../../../utils/numbers'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const TxTableRow = ({ transaction }) => {
  const [open, setOpen] = React.useState(false)
  const { isRoman } = useContext(RomanNumeralsContext)

  const generateTransactionAmountDisplay = () => {
    if (isRoman) {
      let rounded = Math.floor(transaction.amount / 100).toFixed(2)
      return integerToRoman(rounded)
    } else {
      return (transaction.amount / 100).toFixed(2)
    }
  }

  return (
    <>
      <TableRow data-testid={`transaction-${transaction._id}`} hover key={`transaction-${transaction._id}`}>
        <TableCell>
          <IconButton aria-label='expand row' onClick={() => setOpen(!open)} size='small'>
            {open ? <KeyboardArrowUpIcon data-testid='up-icon' /> : <KeyboardArrowDownIcon data-testid='down-icon' />}
          </IconButton>
        </TableCell>
        <TableCell align='center' data-testid={makeDataTestId(transaction._id, 'description')}>{transaction.description}</TableCell>
        <TableCell align='center' data-testid={makeDataTestId(transaction._id, 'paymentType')}>{transaction.debit ? 'Debit' : 'Credit'}</TableCell>
        <TableCell align='center' data-testid={makeDataTestId(transaction._id, 'amount')}>${generateTransactionAmountDisplay()}</TableCell>
        <TableCell align='center' data-testid={makeDataTestId(transaction._id, 'date')}>{transaction.createdAt}</TableCell>
        <TableCell align='center'>
          <TxTableMenu transactionId={transaction._id} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box style={{ backgroundColor: '#fafafa', borderRadius: 2 }}>
              <Table aria-label='purchases' size='medium'>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User</strong></TableCell>
                    <TableCell><strong>Merchant</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Eric</TableCell>
                    <TableCell>Random Merchant</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

TxTableRow.propTypes = {
  transaction: shape({
    amount: number,
    credit: bool,
    debit: bool,
    description: string,
    _id: string
  })
}

export default TxTableRow
