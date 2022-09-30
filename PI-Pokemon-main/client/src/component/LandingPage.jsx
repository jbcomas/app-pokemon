import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getType } from "../actions";



export default function LandingPage(){
    const dispatch= useDispatch()
    useEffect(()=> {
        dispatch(getPokemons())
    },[dispatch]) 
    useEffect(()=> {
        dispatch(getType())
    },[dispatch]) 

    return (
        <div className={styles['bg']}> 
            
            <h1>Pokemon</h1>
            <Link to= '/home'>
            <button className={styles["btn"]}>ENTER</button>
            </Link>
            
        </div>
    )




}