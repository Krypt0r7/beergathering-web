import { useMediaQuery, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../Contexts/ThemeContext'

const useCustomTheme = () => {
  const theme = useTheme()
  const { isDark, switchTheme } = useContext(ThemeContext)
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'))
  return { isDark, switchTheme, isLarge }
}

export default useCustomTheme
