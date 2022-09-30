import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clear, getPokemonsId } from '../actions'
import styles from './Card.module.css'
import style from './Detail.module.css'
import { Link } from 'react-router-dom'
import Loading from './Loading'


export default function Detail(props){
    const dispatch = useDispatch()
    const pokemonDetail = useSelector( (state) => state.detail)


useEffect(()=>{
    dispatch(getPokemonsId(props.match.params.id))
    return  dispatch(clear())
},[])

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
            psychic: "#ff2cc3;",
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
        
        
        
        <> {
       pokemonDetail.length>0 ? pokemonDetail.map(p =>
        
               <div key={pokemonDetail[0].id} style={{background: `${colours[p.types[0]]}` }} className={styles['detail']}>
                <div  style={{ background: `${colours[p.types[0]]}` }} className={styles["card"]}>
                    <figure className={styles["card card--normal"]}>
                        <div className={styles["card__image-container"]}>
                            { !p.img 

                                ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${random()}.svg`} alt='not found' />
                                : <img src={p.img} alt='not found' />
                            }
                        </div>
                        <figcaption className={styles["card__caption"]}>
                            <h1 className={styles["card__name"]}>{p.name}</h1>
                           
                            <h3 style={{ background: `${colours[p.types[0]]}` }} className={styles["card__type"]}>
                            { p.types.length > 1 ? `${p.types[0]} ${p.types[1]}`
                                        : p.types[0]
                               } 
                            </h3>
                            
                            <table className={styles["card__stats"]}>
                                <tbody><tr>
                                    <th>Health</th>
                                    <td>{p.health}</td>
                                </tr>
                                    <tr>
                                        <th>Attack</th>
                                        <td>{p.attack}</td>
                                    </tr>

                                    <tr>
                                        <th>Defense</th>
                                        <td>{p.defense}</td>
                                    </tr>
                                    <tr>
                                        <th>Speed</th>
                                        <td>{p.speed}</td>
                                    </tr>
                                    <tr>
                                        <th>weight</th>
                                        <td>{p.weight}</td>
                                    </tr>
                                    <tr>
                                        <th>height</th>
                                        <td>{p.height}</td>
                                    </tr>

                                </tbody></table>

                            <div className={styles["card__abilities"]}>
                                <h4 className={styles["card__ability"]}>
                                    <span className={styles["card__label"]}>Ability</span>
                                    {!p.ability ? 'jugar'
                                                : p.ability}
                                </h4>

                            </div>
                        </figcaption>
        </figure>
        
        
                </div>


                                    

                <Link to='/home/'>
                <button  className={style['btn_detail']}>Home</button>
                </Link>

    
                
                </div>  
        ): <Loading/>
        }
         </>
    )
}