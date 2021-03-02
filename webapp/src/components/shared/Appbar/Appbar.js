import React, { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import { useLocation } from 'react-router-dom'

import { AppDrawer } from '../AppDrawer'
import { RomanNumeralsContext } from '../../../context/romanNumeralsContext'

const StyledAppBar = styled(({ ...rest }) => (
  <AppBar {...rest} />
))`
  margin-bottom: 30px;
`

const StyledToolbar = styled(({ ...rest }) => (
  <Toolbar {...rest} />
))`
  display: flex;
  justify-content: space-between;
`

const StyledDiv = styled.div`
  display: flex;
`

const MuiAppBar = () => {
  const { isRoman, setIsRoman, isRomanDisabled } = useContext(RomanNumeralsContext)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.includes('/create') || pathname.includes('/edit')) {
      setIsRoman(false)
    }
  })

  return (
    <div>
      <StyledAppBar position='static'>
        <StyledToolbar variant='dense'>
          <StyledDiv>
            <AppDrawer />
            <Typography color='inherit' variant='h6'>
            Divvy Expense Tracker
            </Typography>
          </StyledDiv>
          <Tooltip title='Convert to Roman Numerals'>
            <Switch
              checked={isRoman}
              disabled={isRomanDisabled}
              onChange={() => setIsRoman(!isRoman)}
            />
          </Tooltip>

        </StyledToolbar>

      </StyledAppBar>
    </div>
  )
}

export default MuiAppBar
