import React from "react";
import styles from './Paginado.module.css'


export default function Paginado({ pokemonsPerPage, allPokemons,paginado }) {
    const pageNumber = []

            for (let i = 0; i <Math.ceil(allPokemons/pokemonsPerPage); i++) {
                pageNumber.push(i + 1)
                
            }
    return (
            <nav>
                <ul className={styles['pg']}>
                    {
                        pageNumber && pageNumber.map((number) => (
                            <li className={styles['li']} key={number}>
                                <a onClick={()=> paginado(number)}>{number}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
    )
}