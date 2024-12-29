'use client'
import { useState } from 'react'
import './input.css'

export default function Input({id=null, description='', extraClass=[], wrapperClass=[], ...props}){
    const w_cls = ['form-element-wrapper'].concat(wrapperClass);
    const cls = ['form-element'].concat(extraClass);
    const [empty, setEmpty] = useState(true);
    return (
        <div className={w_cls.join(' ')} data-empty={empty ? 1 : 0}>
            { description ? <p className='field-description'>{description}</p> : null }
            <input id={id} className={cls.join(' ')} type={'text'} {...props} />
        </div>
    )
}