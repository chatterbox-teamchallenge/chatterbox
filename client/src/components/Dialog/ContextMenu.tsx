import React from 'react'
import trash from '../../img/chat/dialog/trash.svg'
import edit from '../../img/chat/dialog/edit.svg'

interface ContextMenuProps {
    x: number;
    y: number;
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, onEdit, onDelete, onClose}) => {
  
  
  return (
      <div
        className='contextmenu'
        style={{top: y, left: x}}
        onClick={onClose}>
          
      <button className='contextmenu__option' type='button' onClick={onEdit}>
        <img className='contextmenu__icon' src={edit} alt="edit" />
        Edit
      </button>
      <button className='contextmenu__option' type='button' onClick={onDelete}>
        <img className='contextmenu__icon' src={trash} alt="delete" />
        Delete message
      </button>
    </div>
  )
}

export default ContextMenu
