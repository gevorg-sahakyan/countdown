import { memo } from 'react'
import { calculatePercentage } from '../../utils'
import './styles.css'

type Props = {
  value: number
  max: number
  visible: boolean
}

export const Progress = memo((props: Props) => {
  const { value, max, visible } = props

  const progress = max && value ? calculatePercentage(value, max) : 100

  return (
    <div className={`progress-bar-container ${visible ? 'visible' : ''}`} >
      <div className='progress-bar' style={{ height: `${progress}%` }} />
    </div>
  )
})
