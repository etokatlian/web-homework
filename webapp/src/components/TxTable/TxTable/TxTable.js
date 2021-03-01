import React from 'react'
import { arrayOf, string, bool, number, shape, func } from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { TxTableRow } from '../TxTableRow'

const TxTable = ({ data, history }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            {/* <TableCell align='right'>ID</TableCell> */}
            {/* <TableCell align='right'>User ID</TableCell> */}
            <TableCell align='right'>Description</TableCell>
            {/* <TableCell align='right'>Merchant ID</TableCell> */}
            <TableCell align='right'>Payment Type</TableCell>
            {/* <TableCell align='right'>Debit</TableCell>
            <TableCell align='right'>Credit</TableCell> */}
            <TableCell align='right'>Amount</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((tx, idx) => {
              return (
                <TxTableRow history={history} key={`transaction-${idx}`} transaction={tx} />
              )
            })
          }
        </TableBody>

      </Table>
    </TableContainer>

  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  history: shape({
    push: func
  })
}

export default TxTable
