import React from 'react'

type Prop = {
  disabled: boolean;
  label?: string;
}
export default function SubmitButton({ disabled, label = "Save" }: Prop) {
  return (
      <button type='submit' disabled={disabled}>{disabled ? "Saving..." : label}</button>
  )
}
