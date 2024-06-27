import React from 'react'
import '../../styles/components/_date.scss'

interface DateProps {
    text: string;
}

const Date: React.FC<DateProps> = ({text}) => {
  return (
    <div className='date__container'>
      <p className='date__text'>
              {text}
      </p>
    </div>
  )
}

export default Date
