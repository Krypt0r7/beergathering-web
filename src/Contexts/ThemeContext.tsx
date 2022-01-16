import React, { createContext, useEffect, useState, FC } from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material'
import { useLocalStorage } from '../Hooks/useLocalStorage'

interface IThemeContext {
  isDark: boolean,
  switchTheme: () => void
}

const defaultState = {
  isDark: false,
  switchTheme: () => { }
}

export const ThemeContext = createContext<IThemeContext>(defaultState)

export const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState(defaultState.isDark)
  const [dark, setDark] = useLocalStorage('darkMode', false)

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      warning: {
        main: '#f57c00'
      },
      primary: {
        main: '#417B5A'
      },
      success: {
        main: '#388e3c'
      },
      background: {
        default: dark ? "#222" : "#fff"
      }
    },
    typography: {
      h1: { fontSize: '2em' },
      h2: { fontSize: '1.5em' },
      h3: { fontSize: '1.17em' },
      h4: { fontSize: '1.12em' },
      h5: { fontSize: '.83em' },
      h6: { fontSize: '.75em' }
    }
  })

  useEffect(() => {
    setIsDark(dark)
  }, [dark])

  const switchTheme = () => {
    setDark(!dark)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ isDark, switchTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

