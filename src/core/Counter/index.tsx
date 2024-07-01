import { useState } from 'react'
import { CounterClass } from './style'

type Props = {
  initialCount?: number
  min?: number
  onCountChange?: (count: number) => void
}

const Counter = (props: Props) => {
  const { initialCount = 1, min = 0, onCountChange } = props
  const [count, setCount] = useState(() => initialCount)

  const inc = () => {
    setCount(count + 1)
    onCountChange && onCountChange(count + 1)
  }

  const des = () => {
    if (count === min) return
    setCount(count - 1)
    onCountChange && onCountChange(count - 1)
  }

  return (
    <div className={CounterClass}>
      <div className="counter">
        <span onClick={des}>-</span>
        <input type="text" readOnly value={count} data-testid="input" />
        <span onClick={inc}>+</span>
      </div>
    </div>
  )
}

export { Counter }
