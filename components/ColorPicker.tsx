import { Icon } from '@iconify/react'
import { hexToRgb } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import {
  RGBColor,
  ColorChangeHandler,
  SketchPicker,
  ColorResult,
} from 'react-color'
type Props = {
  color: RGBColor
}

const ColorPicker = () => {
  const [color, onSetChange] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  })
  const [expand, isExpanded] = useState<boolean>(false)
  const handleClose = () => {
    isExpanded(false)
  }
  const handleExpand = () => {
    isExpanded(!expand)
  }

  const onChange: ColorChangeHandler = (colorResult: ColorResult) => {
    onSetChange(colorResult.rgb)
  }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handleExpand}
      >
        <div
          style={{
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        />
      </div>
      {expand ? (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
          }}
          aria-haspopup='true'
          aria-expanded={expand}
          aria-label='rdw-color-picker'
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={onChange} />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPicker
