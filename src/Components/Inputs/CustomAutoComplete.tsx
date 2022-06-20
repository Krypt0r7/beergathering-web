import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

interface IAutoCompleteProps {
  multiple?: boolean
  required?: boolean
  label: string
  value: string | string[]
  onChange(value: string | string[] | null): void
  options: string[]
}

const CustomAutoComplete: React.FC<IAutoCompleteProps> = ({
  value,
  onChange,
  options,
  label,
  required = false,
  multiple = false
}) => {
  return (
    <>
      <Autocomplete
        multiple={multiple!}
        freeSolo
        autoSelect
        getOptionLabel={option => option}
        value={value}
        onChange={(e: any, v: string | string[] | null) => onChange(v)}
        fullWidth
        options={options || []}
        renderInput={params => (
          <TextField {...params} label={label} required={required} />
        )}
      />
    </>
  )
}

export default CustomAutoComplete
