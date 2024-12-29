'use client'
import { useState } from 'react'
import './button.css'

export default function Button({children, id=null, text='', onClick=null, extraClass=[], wrapperClass=[], ...props}){
    const w_cls = ['form-element-wrapper'].concat(wrapperClass);
    const cls = ['form-element'].concat(extraClass);
    function handleClick(){
        if(typeof onClick === 'function')
            onClick();
    }
    return (
        <div className={w_cls.join(' ')}>
            <button id={null} className={cls.join(' ')} onClick={handleClick}>{text}</button>
        </div>
    )
}