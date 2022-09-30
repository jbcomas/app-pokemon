import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'





export default function Card({name, image, types , id , attack, defense , hp , speed ,ability, height,
    weight, fromDb, handleDelete }){
        const colours = {
            normal: "#A8A77Aaa",
            fire: "#EE8130aa",
            water: "#6390F0aa",
            electric: "#F7D02Caa",
            grass: "#7AC74Caa",
            ice: "#96D9D6aa",
            fighting: "#C22E28aa",
            poison: "#A33EA1aa",
            ground: "#E2BF65aa",
            flying: "#A98FF3aa",
            psychic: "#ff2cc3ce",
            bug: "#A6B91Aaa",
            rock: "#B6A136aa",
            ghost: "#735797aa",
            dragon: "#6F35FCaa",
            dark: "#705746aa",
            steel: "#B7B7CEaa",
            fairy: "#D685ADaa",
            
        }
         const random = function getRandom() {
            return  Math.floor(Math.random() * (40 - 100) + 100)
          }

    return (

        <div>
            <Link to={`/home/${id}`}>
                <div style={{ background: `${colours[types[0]]}` }} className={styles["card"]}>
                    <figure className={styles["card card--normal"]}>
                    { fromDb ? <button className={styles['delete']} value={id} onClick={(e)=> handleDelete(e)} >x</button> 
                                    : '' }
                        <div className={styles["card__image-container"]}>
                            { !image 

                                ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${random()}.svg`} alt='not found' />
                                : <img src={image} alt='not found' />
                            }
                        </div>
                        <figcaption className={styles["card__caption"]}>
                            <h1 className={styles["card__name"]}>{name}</h1>
                           
                            <h3 style={{ background: `${colours[types[0]]}` }} className={styles["card__type"]}>
                            { types.length > 1 ? `${types[0]} ${types[1]}`
                                        : types[0]
                               } 
                            </h3>
                          
                        </figcaption>
                    </figure>
                </div>






    
            </Link>
         </div>
    )
}

            