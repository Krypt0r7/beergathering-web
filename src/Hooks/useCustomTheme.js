import { useContext } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'


const useCustomTheme = () => {
  const {isDark, switchTheme} = useContext(ThemeContext)
  return {isDark, switchTheme}
}

export default useCustomTheme