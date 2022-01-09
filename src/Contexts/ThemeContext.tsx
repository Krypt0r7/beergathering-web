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
      }
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

