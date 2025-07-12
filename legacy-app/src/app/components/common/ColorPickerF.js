'use strict'

import React, {useState} from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'


export default function ColorPicker({selColor,setParentColor}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(null);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  }

  const handleClose = () => {
    setDisplayColorPicker(false);    
  } 

  const handleChange = (color) => {
    setColor(color.hex);
  }

  const handleChangeComplete = (color, event) => {
    setParentColor(color.hex);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '90px',
        height: '50px',
        borderRadius: '2px',
        background: `${selColor}`,
      },
      swatch: {
        padding: '2px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { displayColorPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <ChromePicker color={ selColor } onChange={ handleChange } onChangeComplete={ handleChangeComplete }/>
      </div> : null }

    </div>  
    );
}
