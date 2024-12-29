'use client'
import { useState } from 'react'
import './form.css'

export default function Form({children, onSubmit=null, id=null, extraClass=[], wrapperClass=[], ...props}){
    const w_cls = ['form-wrapper'].concat(wrapperClass);
    const cls = ['form'].concat(extraClass);
    function handleSubmit(e){
        if(typeof onSubmit === 'function') {
            onSubmit(e);
        }
    }
    return (
        <div className={w_cls.join(' ')}>
            <form id={id} onSubmit={handleSubmit} className={cls.join(' ')} type={'text'} {...props}>
                {children}
            </form>
        </div>
    )
}