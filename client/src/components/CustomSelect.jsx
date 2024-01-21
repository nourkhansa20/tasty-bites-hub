import React from 'react'
import Select from 'react-select'

function CustomSelect({ label, options, onChange, defaultValue, style, responsiveLabel }) {
  const labelStyle = responsiveLabel ? 'hidden md:block' : '';
  return (
    <div className={' ' + style}>
      <div className={'text-[#271916] mb-3 ' + labelStyle}>{label}</div>
      <Select options={options} defaultValue={defaultValue} onChange={onChange}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: '9px',
            border: 'none'
          }),
        }} />
    </div>
  )
}

export default CustomSelect