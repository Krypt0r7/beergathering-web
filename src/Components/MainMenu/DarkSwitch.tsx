import { Box, Switch } from '@mui/material'
import React from 'react'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import useCustomTheme from '../../Hooks/useCustomTheme';

const DarkSwitch = () => {
  const { isDark, switchTheme } = useCustomTheme()

  return (
    <Box display="flex" alignItems="center">
      <BrightnessHighIcon fontSize='small' color='action' />
      <Switch checked={isDark} onChange={() => switchTheme()} />
      <NightlightRoundIcon fontSize='small' color='action' />
    </Box>
  )
}

export default DarkSwitch