'use client'
import { useState } from 'react'
import './textarea.css'

export default function Textarea({id=null, extraClass=[], wrapperClass=[]}, ...props){
    const w_cls = ['form-element-wrapper'].concat(wrapperClass);
    const cls = ['form-element'].concat(extraClass);
    const [empty, setEmpty] = useState(true);
    return (
        <div className={w_cls.join(' ')} data-empty={empty ? 1 : 0}>
            <textarea id={id} className={cls.join(' ')} {...props}></textarea>
        </div>
    )
}