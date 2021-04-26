import { Switch } from '@material-ui/core'
import React, { useContext } from 'react'
import styled, {css} from 'styled-components'
import {Moon} from 'styled-icons/feather'
import { ThemeContext } from '../Contexts/ThemeContext'

const Container = styled.div`
  width: "100%";
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: ${(props) => props.theme.background};
`

const Header = styled.h1`
  font-size: 1em;
  color: ${(props) => props.theme.text};
`

const icon = css`
  color: ${(props) => props.theme.text};
  cursor: pointer;
`
const StyledMoon = styled(Moon)`
  ${icon}
`

const TopBar = () => {
  const {theme, switchTheme} = useContext(ThemeContext)
  return (
    <Container>
      <div>
        <Switch checked={theme === 'dark'} onChange={() => switchTheme(theme === 'dark' ? 'light' : 'dark')} />
        <StyledMoon size="32"  />
      </div>
    </Container>
  )
}

export default TopBar