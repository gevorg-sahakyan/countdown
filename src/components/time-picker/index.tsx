import { ChangeEvent, memo, useCallback } from 'react'
import './styles.css'

type Props = {
  editable: boolean
  value: string
  onChange: (time: string) => void
}

export const TimePicker = memo((props: Props) => {
  const { value, editable, onChange } = props

  const onTimeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <input
      type='time'
      step={1}
      readOnly={!editable}
      value={value}
      onChange={onTimeChange}
      className='time-picker'
    />
  )
})
