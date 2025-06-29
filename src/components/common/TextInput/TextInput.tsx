import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
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

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onValueChange: (val: string) => void
}

const TextInput = (props: InputProps) => {
  const { onValueChange, ...otherProps } = props

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
  }

  return (
    <StyledInput
      type="text"
      {...otherProps}
      spellCheck="false"
      onChange={onChange}
    />
  )
}

export { TextInput }