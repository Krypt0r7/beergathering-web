import React, {  useState } from 'react'

const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('dark')

  const switchTheme = (theme) => setTheme(theme)

  return <ThemeContext.Provider value={{theme, switchTheme}}>
    {children}
  </ThemeContext.Provider>
}

export {ThemeContext, ThemeProvider}