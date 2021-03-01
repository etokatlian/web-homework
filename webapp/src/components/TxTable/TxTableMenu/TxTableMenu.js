import React from 'react'
import { string } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import styled from '@emotion/styled'
import EditIcon from '@material-ui/icons/Edit'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { DELETE_TRANSACTION, GET_TRANSACTIONS } from '../../../gql/queries'

const StyledMenuWrapper = styled.div`
  display: 'flex';
`

const StyledMenuPaper = styled(({ ...rest }) => (
  <Paper {...rest} />
))`
  position: relative;
  z-index: 999;
`

const TxTableMenu = ({ transactionId }) => {
  const history = useHistory()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const [DeleteTransaction, { client }] = useMutation(DELETE_TRANSACTION)

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setMenuOpen(false)
  }

  const handleEditClick = (e) => {
    history.push(`/transactions/${transactionId}/edit`)
    handleClose(e)
  }

  const handleDelete = async () => {
    const res = await DeleteTransaction({
      variables: {
        id: transactionId
      }
    })

    const cache = client.readQuery({ query: GET_TRANSACTIONS })

    const cacheWithoutDeletedTransaction = cache.transactions.filter((transaction) => {
      return transaction._id !== res.data.deleteTransaction._id
    })

    client.writeQuery({
      query: GET_TRANSACTIONS,
      data: {
        transactions: cacheWithoutDeletedTransaction
      }
    })

    setMenuOpen(!!menuOpen)
  }

  function handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setMenuOpen(false)
    }
  }
  const prevOpen = React.useRef(menuOpen)

  React.useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = menuOpen
  }, [menuOpen])

  return (
    <StyledMenuWrapper>
      <div>
        <IconButton
          aria-controls={menuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          ref={anchorRef}
        >
          <EditIcon />
        </IconButton>
        <Popper anchorEl={anchorRef.current} open={menuOpen} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <StyledMenuPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={menuOpen} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(e) => handleEditClick(e)}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </StyledMenuPaper>
            </Grow>
          )}
        </Popper>
      </div>
    </StyledMenuWrapper>
  )
}

TxTableMenu.propTypes = {
  transactionId: string
}

export default TxTableMenu
