import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import {
     getPokemons,
     getType,
    filterPokemons,
    orderByName,
    filterPokemonsType,
    getTypes,
    deletePokemon
    } from '../actions'
import { Link } from 'react-router-dom'
import  Card  from './Card'
import styles from './Home.module.css'
import Paginado from './Paginado'
import style from './Nav.module.css'
import Loading from './Loading'
import SearchBar from './SearchBar'





export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const[ All, setAll ]= useState('')
    
   
    const [order , setOrder ] = useState('')
    const [currentPage,setCurrentPage] = useState(1)
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12)
    const indexLast = currentPage * pokemonsPerPage
    const indexFirst = indexLast  -  pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexFirst, indexLast)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


// ------------useEffect---------
    useEffect(()=> {
        dispatch(getPokemons())
    },[dispatch]) 

    useEffect(()=> {
        dispatch(getTypes())
    },[dispatch]) 

  
    useEffect(() => {
        dispatch(getType())
    }, [allPokemons])


    // ----------HANDLER----------
    function handleClick(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(getPokemons())
    }
    function handleChange(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterPokemons(e.target.value))
        setAll(e.target.value)
    }
    function handleChange2(e) {
        e.preventDefault()
        setCurrentPage(1)
        setAll('All')
        dispatch(filterPokemons(e.target.value))
        
    }
    function handleDelete(e) {
        e.preventDefault()
        dispatch(deletePokemon(e.target.value))
        handleClick(e)
    }
    

    function handleType(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterPokemonsType(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault()
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)       
        dispatch(orderByName(e.target.value))
    }

   
    return (
        <div className={styles['home']} >

            <h2>Pokemon</h2>
        <div className={style['nav']}>
            <button className={style['btn']}  onClick={e =>  handleClick(e)} >
                Inicio
            </button>
            <Link to='/pokemons/'>
                <button className={style['btn']} >
                Create pokemon
                </button>
            </Link>
            <div>
                    
                    <button className={style['btn']} onClick={(e) => handleChange2(e) } value={'All'}>reload</button>
                    <select value={All} className={style['btn']} onChange={(e) => handleChange(e)}>
                        <option value={'All'} > All</option>
                        <option value={'true'} > Db</option>
                        <option value={''} > Api</option>
                    </select>

                    <select className={style['btn']}onChange={(e) => handleSort(e)} >
                        <option>Order</option>
                        <optgroup label='Orden alphabetic'>
                        <option value="asc">Upward</option>
                        <option value="desc">Falling</option>
                        </optgroup>
                        <optgroup label='Order Attack'>
                        <option value="asc">Minor</option>
                        <option value="desc">Mayor</option>
                        </optgroup>
                    </select>
                    
                <select className={style['btn']} onChange={(e) => handleType(e)}  >
                    {types?.map((t) => {
                        return (
                            <option key={t} value={t}>{t}</option>
                        )
                    })
                    }
                </select>
                </div>
        </div>
        <SearchBar set={setCurrentPage}/>
        <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
       
            <div className={styles['cards']}>
                <div className={styles['card']}>
                
                {
                    currentPokemons.length<1? <Loading className={styles['loading']} />
                     :currentPokemons?.map((p) => {
                        return (
                            
                            <Card
                                key={p.id}
                                name={p.name}
                                image={p.img}
                                types={p.types}
                                id={p.id}
                                attack={p.attack}
                                hp={p.health}
                                defense={p.defense}
                                speed={p.speed}
                                ability={p.ability}
                                weight={p.weight}
                                height={p.height}
                                fromDb={p.fromDb}
                                handleDelete={handleDelete}
                            />
                           
                        )

                    })
                            
                    
                }
                
           
                </div>
            </div>


        </div>
    )
}
