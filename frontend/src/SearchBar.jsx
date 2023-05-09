import { Container, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ initialValue, onChangeText }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)

  const handleChange = (event) => {
    event.preventDefault()
    const newValue = event.target.value
    setSearchTerm(newValue)
    onChangeText(newValue)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  )
}

export const SearchBarMomoized = React.memo(
  SearchBar,
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.onChangeText === nextProps.onChangeText
    )
  }
)
