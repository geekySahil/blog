import React, { useId } from 'react'
import { forwardRef } from 'react'

function Select({
    label,
    options,
    classname= "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label className={`${className}`} htmlFor={id}>{label}</label>}
      <select ref={ref} id={id} className=''>
        {options?.map((option) => (
            <option  key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Select)
