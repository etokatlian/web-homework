import React from 'react'
import styled from '@emotion/styled'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AppDrawer } from '../AppDrawer'

const StyledAppBar = styled(({ ...rest }) => (
  <AppBar {...rest} />
))`
  margin-bottom: 20px;
`

const StyledToolbar = styled(({ ...rest }) => (
  <Toolbar {...rest} />
))`
  display: flex;
`

const MuiAppBar = () => {
  return (
    <div>
      <StyledAppBar position='static' style={{ fill: 'green' }}>
        <StyledToolbar variant='dense'>
          <AppDrawer />
          <Typography color='inherit' variant='h6'>
            Divvy Expense Tracker
          </Typography>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  )
}

export default MuiAppBar
