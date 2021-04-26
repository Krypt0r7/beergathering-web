import React, {  useState } from 'react'
import {createMuiTheme, ThemeProvider as MuiThemeProvider} from '@material-ui/core'

const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: isDark? 'dark' : 'light',
    }
  })

  const switchTheme = () => setIsDark(!isDark)

  return <MuiThemeProvider theme={theme}>
    <ThemeContext.Provider value={{isDark, switchTheme}}>
        {children}
    </ThemeContext.Provider>
  </MuiThemeProvider>
}

export {ThemeContext, ThemeProvider}