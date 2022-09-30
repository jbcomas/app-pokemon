import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPokemonsName } from "../actions"
import styles from './SearchBar.module.css'


export default function SearchBar({set}) {
    // let textInput = useRef(null);

    // function handleClick() {
    //   textInput.current.value = '';
    //   console.log(textInput);
      
    // }
    
    const dispatch = useDispatch()
    const [name, setName] = useState('')

   
    function handleChangeName(e) {
        e.preventDefault()
        setName(e.target.value)
        
    }
    function handleName(e) {
        e.preventDefault()
        setName('')
        set(1)
        dispatch(getPokemonsName(name))
    }


    return (
        <div >
            <input  value={name} className={styles['search']}  onChange={e => handleChangeName(e)} type="text"  placeholder="Search..."/>
            <button className={styles['btn']} onClick={e => handleName(e)}  type="submit">Search</button>
        </div>
    )
}
