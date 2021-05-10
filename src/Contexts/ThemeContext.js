import React, { createContext, useEffect, useState, } from 'react'
import {createMuiTheme, ThemeProvider as MuiThemeProvider} from '@material-ui/core'
import { useLocalStorage } from '../Hooks/useLocalStorage'

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false)
  const [dark, setDark] = useLocalStorage('darkMode', false)

  const theme = createMuiTheme({
    palette: {
      type: dark? 'dark' : 'light',
      warning: {
        main: '#f57c00'
      },
      primary: {
        main: '#417B5A',
      },
      success: {
        main: '#388e3c'
      }
    },
    overrides: {
      MuiButton: {
        textTransform: 'capatalize'
      }
    }
    
  })

  useEffect(() => {
    dark ? setIsDark(true) : setIsDark(false)
  }, [dark])

  const switchTheme = () => { 
    setDark(!dark)
  }


  return <MuiThemeProvider theme={theme}>
    <ThemeContext.Provider value={{isDark, switchTheme}}>
        {children}
    </ThemeContext.Provider>
  </MuiThemeProvider>
}

export {ThemeContext, ThemeProvider}