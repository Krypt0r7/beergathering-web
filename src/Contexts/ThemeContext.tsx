import React, { createContext, useEffect, useState, FC } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { useLocalStorage } from '../Hooks/useLocalStorage'

type Props = {
  children: JSX.Element[] | JSX.Element
}

interface IThemeContext {
  isDark: boolean
  switchTheme: () => void
}

export const ThemeContext = createContext<IThemeContext>({
  isDark: true,
  switchTheme: Function
})

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const [dark, setDark] = useLocalStorage('darkMode', false)

  const sharedTheme = {
    typography: {
      h1: { fontSize: '2em' },
      h2: { fontSize: '1.5em' },
      h3: { fontSize: '1.17em' },
      h4: { fontSize: '1.12em' },
      h5: { fontSize: '.83em' },
      h6: { fontSize: '.75em' }
    }
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      warning: {
        main: '#f57c00'
      },
      primary: {
        main: '#87C09F'
      },
      success: {
        main: '#388e3c'
      },
      background: {
        default: '#222'
      }
    },
    ...sharedTheme
  })

  const theme = createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: '#333'
      },
      warning: {
        main: '#FF9933'
      },
      primary: {
        main: '#417B5A'
      },
      success: {
        main: '#388e3c'
      },
      background: {
        default: '#fff'
      }
    },
    ...sharedTheme
  })

  useEffect(() => {
    setIsDark(dark)
  }, [dark])

  const switchTheme = () => {
    setDark(!dark)
  }

  return (
    <MuiThemeProvider theme={dark ? darkTheme : theme}>
      <ThemeContext.Provider value={{ isDark, switchTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}
