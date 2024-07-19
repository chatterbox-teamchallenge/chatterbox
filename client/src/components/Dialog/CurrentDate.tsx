import React from 'react'
import '../../styles/components/_date.scss'



const CurrentDate = () => {
  const date = new Date()
  const day = date.toLocaleDateString('en-US', { day: '2-digit' })
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })

  const formattedDate = `${weekday} ${day} ${month}`
  
  return (
    <div className='date__container'>
      <p className='date__text'>
              {formattedDate}
      </p>
    </div>
  )
}

export default CurrentDate
