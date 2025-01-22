import React, { forwardRef } from 'react'
import { useId } from 'react'

 const Input = forwardRef(function Input (
   { label,
    type = 'text',
    className = '',
    children,
    ...props}
    ,ref
)
{
  const Id = useId()

  return (
    <div className='w-full'>
        {label && (
            <label
             className={`inline-block pl-1 mb-1 ${className}`}
             htmlFor={props.id}
             id={Id}>
                {label}
            </label>
        )}
        <input 
            type = {type}
            ref={ref}
            className={`${className}`}
            {...props}
            id={Id}       
            />
        
    </div>
  )
})

export default Input
