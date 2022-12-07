import { useState } from 'react'
import {
  Color,
  ColorChangeHandler,
  SketchPicker,
  ColorResult,
} from 'react-color'
type Props = {
  onChange: any
}

const ColorPicker = ({ onChange }: Props) => {
  const [color, onSetChange] = useState<Color>('#000000')
  const [expand, isExpanded] = useState<boolean>(false)
  const handleClose = () => {
    isExpanded(false)
  }
  const handleExpand = () => {
    isExpanded(!expand)
  }

  const handleChange: ColorChangeHandler = (colorResult: ColorResult) => {
    onChange('color', colorResult.hex)
    onSetChange(colorResult.hex)
  }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
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
            background: color.toString(),
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
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPicker
