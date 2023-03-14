import { useCallback, useEffect, useRef, useState } from 'react'
import { msToHMS, timeToMilliseconds } from '../utils'
import { Progress, PlayIcon, PauseIcon, StopIcon, TimePicker } from '../components'
import './styles.css'

type RunningState = 'initial' | 'running' | 'paused'
const initialTime = '00:00:00'

export const App = () => {
  const [targetTime, setTargetTime] = useState<string>(initialTime)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [countdownState, setCountdownState] = useState<RunningState>('initial')
  const intervalId = useRef<number>()
  const totalTime = useRef<number>(0)

  const isRunning = countdownState === 'running'
  const isInitial = countdownState === 'initial'

  const onStop = useCallback(() => {
    setCountdownState('initial')
    setTargetTime(initialTime)
    setTimeRemaining(0)
    totalTime.current = 0
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setTimeRemaining(time => time - 100)
      }, 100)
    } else {
      clearInterval(intervalId.current)
    }

    return () => clearInterval(intervalId.current)
  }, [isRunning])

  useEffect(() => {
    if (isRunning && timeRemaining <= 0) {
      setCountdownState('initial')
      clearInterval(intervalId.current)
    }
  }, [timeRemaining, isRunning, onStop])

  const onTimeChange = useCallback((time: string) => {
    setTargetTime(time)
    totalTime.current = timeToMilliseconds(time)
  }, [])

  const handleRunningState = useCallback(() => {
    if (isInitial) {
      setTimeRemaining(totalTime.current)
      setCountdownState('running')
    } else {
      setCountdownState(isRunning ? 'paused' : 'running')
    }
  }, [isInitial, isRunning])

  const inputValue = isInitial ? targetTime : msToHMS(timeRemaining)

  return (
    <div className='app-container'>
      <Progress
        value={timeRemaining}
        max={totalTime.current}
        visible={!isInitial}
      />

      <TimePicker
        value={inputValue}
        editable={isInitial}
        onChange={onTimeChange}
      />

      <div className='buttons-container'>
        <button
          disabled={!totalTime.current}
          onClick={handleRunningState}
          className='button main-button'
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          disabled={isInitial}
          onClick={onStop}
          className='button'
        >
          <StopIcon />
        </button>
      </div>
    </div>
  )
}
