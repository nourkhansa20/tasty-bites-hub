import React, { forwardRef } from 'react'

const CustomTextFiled = forwardRef(({ label, placeholder, name, style, type, onKeyUp }, ref) => {
    return (
        <div className={" w-full " + style}>
            {label && <label className='mb-2 inline-block text-[2ex]'>{label}</label>}

            <input type={type} className={' rounded-lg p-2 w-full mb-4 ' + name} ref={ref} placeholder={placeholder} onKeyUp={onKeyUp} />
        </div>
    )
}
)
export default CustomTextFiled