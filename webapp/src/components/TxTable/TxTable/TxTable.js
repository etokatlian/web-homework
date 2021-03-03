import React from 'react'
import Paper from '@material-ui/core/Paper'
import styled from '@emotion/styled'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { useHistory } from 'react-router-dom'

import { TxTableRow } from '../TxTableRow'

const StyledTableHead = styled(({ ...rest }) => (
  <TableHead {...rest} />
))`
  background-color: black
`

const StyledTypography = styled(({ ...rest }) => (
  <Typography {...rest} />
))`
`

const StyledTableContainer = styled(({ ...rest }) => (
  <TableContainer {...rest} />
))`
  max-height: 750px
`

const TxTable = ({ transactionsData }) => {
  const history = useHistory()

  const handleCreateTransactionClick = () => {
    history.push('/transactions/create')
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label='sticky table' stickyHeader >
        <StyledTableHead>
          <TableRow>
            <TableCell />
            <TableCell align='center'><StyledTypography variant='h6'>Description</StyledTypography></TableCell>
            <TableCell align='center'><StyledTypography variant='h6'>Payment Type</StyledTypography></TableCell>
            <TableCell align='center'><StyledTypography variant='h6'>Amount</StyledTypography></TableCell>
            <TableCell align='center'><StyledTypography variant='h6'>Date</StyledTypography></TableCell>
            <TableCell align='center'>
              <IconButton aria-label='expand row' data-testid='custom-element' fontSize='large' onClick={handleCreateTransactionClick} role='button'>
                <AddIcon fontSize='large' />
              </IconButton>
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {
            transactionsData.map((tx, idx) => {
              return (
                <TxTableRow key={`transaction-${idx}`} transaction={tx} />
              )
            })
          }
        </TableBody>

      </Table>
    </StyledTableContainer>

  )
}

TxTable.propTypes = {
  transactionsData: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

export default TxTable
