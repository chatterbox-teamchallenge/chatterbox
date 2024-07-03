import React from 'react'
import '../../styles/components/_dialog.scss'
import '../../styles/components/_person.scss'

import kate from '../../img/chat/dialog/kate.jpg'
import Date from './Date'
import DialogForm from './DialogForm'
import { icons } from "../../constants/icons";
import DialogWindow from './DialogWindow'


const Dialog = () => {
  return (
    <div className='dialogue__box'>
      <div className='dialogue__header'>
        <div className='person'>
          <div className='person__img-box'>
            <img src={kate} alt="person" className='person__img'/>
            <div className='person__online'></div>
          </div>

          <div className='person__data'>
            <p className='person__name'>Kate</p>
            <p className='person__status'>Online</p>
          </div>
          

        </div>

        <ul className='usertools'>
          <li>
            <button>
            <img src={icons.phone} alt="phone" className='usertools__icon phone'/>
            </button>
          </li>
          <li>
            <button>
          <img src={icons.camera} alt="camera" className='usertools__icon camera'/>
          </button>
          </li>
          <li>
            <button>
          <img src={icons.dots} alt="dots" className='usertools__icon dots'/>
            </button>
          </li>

          
         
          
        </ul>
      </div>

      <Date text={'Wed 9 May'} />
      <DialogWindow/>
      <DialogForm/>
    </div>
  )
}

export default Dialog
