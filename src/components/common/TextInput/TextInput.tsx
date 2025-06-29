import { type ChangeEvent, type ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  background: transparent;
  font-size: 2.2rem;
  display: inline-block;
  outline: none;
  border: none;
  color: white;
  border-bottom: 2px solid white;
  padding: 0.5rem 0;
  border-radius: 0;
`

interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  onValueChange: (value: string) => void
}

export const TextInput = ({ onValueChange, ...otherProps }: TextInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value)
  }

  return (
    <StyledInput
      type="text"
      {...otherProps}
      spellCheck="false"
      onChange={handleChange}
    />
  )
}
