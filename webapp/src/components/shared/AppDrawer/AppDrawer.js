import React, { useState } from 'react'
import styled from '@emotion/styled'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone'
import AddIcon from '@material-ui/icons/Add'
import TimelineIcon from '@material-ui/icons/Timeline'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'

const StyledLink = styled(({ color, ...rest }) => (
  <Link {...rest} />
))`
  text-decoration: none;
  color: #696969;
`

const StyledDrawerWrapper = styled.div`
  width: 250px;
`

const AppDrawer = () => {
  const [state, setState] = useState({
    left: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <StyledDrawerWrapper
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      role='presentation'
    >
      <List>
        <StyledLink to='/'>
          <ListItem button key={'Home'}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </StyledLink>
        <StyledLink to='/transactions'>
          <ListItem button key={'Transactions'}>
            <ListItemIcon><AccountBalanceTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'Transactions'} />
          </ListItem>
        </StyledLink>
        <StyledLink to='/transactions/create'>
          <ListItem button key={'Create Transaction'}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Create Transaction'} />
          </ListItem>
        </StyledLink>
        <StyledLink to='/transactions/metrics'>
          <ListItem button key={'Metrics'}>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText primary={'Metrics'} />
          </ListItem>
        </StyledLink>
      </List>
    </StyledDrawerWrapper>
  )

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{ fill: 'white' }} /></Button>
      <Drawer onClose={toggleDrawer('left', false)} open={state.left}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}

export default AppDrawer
