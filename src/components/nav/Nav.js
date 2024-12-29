'use client'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import './nav.css'
import items from '@/config/pages_config.js'

export default function Nav(){
    const nav_ref = useRef(null);
    useEffect(()=>{
        const r = document.querySelector(':root');
        r.style.setProperty('--nav-height', nav_ref.current.offsetHeight + 'px');
    }, [])
    return (
        <nav ref={nav_ref} id="nav"><ul>{
            items.map((item)=>{
                const url = `/${item['action']}/${item['slug']}`;
                return (
                <li key={`nav-item-${item['slug']}`} className='nav-item'>
                    <Link className='body' href={url}>{item['name']}</Link>
                </li>
                )
            })    
        }</ul></nav>
    )
}