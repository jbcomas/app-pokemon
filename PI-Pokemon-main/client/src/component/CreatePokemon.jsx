import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../actions";
import styles from './CreatePokemon.module.css'
import error from './Error.module.css'



export default function CreatePokemon() {
    const history = useHistory()
    const [errors,setErrors ] = useState({})
    const [input,setInput] = useState ( { 
        name:'',
        height: 0,
        weight: 0,
        health: 0,
        attack:0,
        defense:0,
        speed:0,
        types:[]
        
    })
const dispatch = useDispatch()
const types = useSelector((state)=>state.alltypes)
    useEffect(()=>{
        dispatch(getTypes())
    },[])

    function validate(input) {
        let error = {}
        if(!input.name){ 
            error.name = 'Se requiere un Nombre'
        }
        else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]*)+$/.test(input.name)){
            error.name = 'el nombre tiene que empezar con mayuscula y no puede contener numeros ni espacios'
        }
        if(!input.height){ 
            error.height = 'se requiere un valor de heigth'
        }else if(input.height<10){
            error.height = 'ingresa una valor entre 10 y 99 para height'
        }else if(!/^[0-9]{2}$/.test(input.height)){
            error.height = 'ingresa una valor entre 10 y 99 para height'
        }
        if(!input.weight){ 
            error.weight = 'Se requiere un valor de weight'
        }else if(!/^[0-9]{2}$/.test(input.weight)){
            error.weight = 'ingresa una valor entre 10 y 99 para height'
        }
        if(input.health <1 || input.health> 80){ 
            error.health = 'ingresa una valor entre 1 y 80 para health'
        }else if(!/^[0-9]{2}$/.test(input.health)){
            error.health = 'ingresa una valor entre 10 y 99 para height'
        }
        if(input.attack <1 || input.attack> 80){ 
            error.attack = 'ingresa una valor entre 1 y 80 para attack'
        }else if(!/^[0-9]{2}$/.test(input.attack)){
            error.attack = 'ingresa una valor entre 10 y 99 para height'
        }
        if(input.defense <1 ||input.defense > 80){ 
            error.defense = 'ingresa una valor entre 1 y 80 para Defense'
        }else if(!/^[0-9]{2}$/.test(input.defense)){
            error.defense = 'ingresa una valor entre 10 y 99 para height'
        }
        if(input.speed <1 || input.speed> 80){ 
            error.speed = 'ingresa una valor entre 1 y 80 para speed'
        }else if(!/^[0-9]{2}$/.test(input.speed)){
            error.speed = 'ingresa una valor entre 10 y 99 para height'
        }
        if(input.types.length === 0){ 
            error.types = 'ingresa un tipo'
        }
       
        return error
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input))
        setInput({
        name:'',
        height: 0,
        weight: 0,
        health: 0,
        attack:0,
        defense:0,
        speed:0,
        types:[]
        })
        history.push('/home')
    }

    function handleInput(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value}
        ))
    }

    function handleSelect(e){
        const repeat = input.types?.includes(e.target.value)
        if (repeat) {
            const rep = input.types.filter((t) => t !== e.target.value)
            setInput({
                ...input,
                types: rep
            })
        } else{
            if (input.types.length === 2) {
                alert('No se pueden agregar mas types')
            } else {
                setInput({
                    ...input,
                    types: [...input.types, e.target.value]
                })
            }
        }
        setErrors(validate({
            ...input,
            types
        }
        ))
    
    }


    function handleDelete(e){
        const repeat = input.types?.includes(e.target.value)
        if(repeat) {
            const rep = input.types.filter((t) => t !== e.target.value)
            setInput({
                ...input,
                types: rep
            })
    }}
    let active = true
    

    return (
        <div className={styles['create']}>
            <Link to={'/home'}>
                <button className={styles['btn']} >Volver</button>
            </Link>
            <h1>Create you Pokemon</h1>
            <form className={styles['form']} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input className={errors.name ? error['input'] : styles['input']} type="text"
                        value={input.name}
                        name='name'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.name && (
                            <label className={error['danger']}>{errors.name}</label>
                        )
                    }
                </div>
                <div>
                    <label>Type: </label>
                    <select className={errors.types ? error['input'] : styles['input']} onChange={(e) => handleSelect(e)}>
                        {
                            types?.map((t) => {
                                return (
                                    <option  
                                        name={t.name}
                                        key={t.name}
                                        value={t.name}
                                    >
                                    {t.name}
                                    </option>
                                )
                            })
                        }
                      
                    </select>
                    {errors.types && (
                            <label className={error['danger']}>{errors.types}</label>
                        )}
                <ul className={styles['list']}>{input.types?.map((t)=>
                    <li className={styles['list_type']} key={t}>{t}<button className={styles['btn_type']} value={t} onClick={(e) => handleDelete(e) } type={'button'}>x</button></li>
                    )}</ul>
                </div>
                <div>
                    <label>Height: </label>
                    { errors.types ? active = true : active = false}
                    <input disabled={active} className={errors.height ? error['input'] : styles['input']} type={'number'}
                        value={input.height}
                        name='height'
                        onChange={(e)=>handleInput(e)}
                    /> 
                    {
                        errors.height && (
                            <label className={error['danger']}>{errors.height}</label>
                        )
                    }
                </div>
                <div>
                     { errors.height ? active = true : active = false}
                    <label>Weight: </label>
                    <input disabled={active} className={errors.weight ? error['input'] : styles['input']} type={'number'}
                        value={input.weight}
                        name='weight'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.weight && (
                            <label className={error['danger']}>{errors.weight}</label>
                        )
                    }
                </div>
                <div>
                     { errors.weight ? active = true : active = false}
                    <label>Health: </label>
                    <input disabled={active} className={errors.health ? error['input'] : styles['input']} type={'number'}
                        value={input.health}
                        name='health'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.health && (
                            <label className={error['danger']}>{errors.health}</label>
                        )
                    }
                </div>
                <div>
                    { errors.health ? active = true : active = false}
                    <label>Attack: </label>
                    <input disabled={active} className={errors.attack ? error['input'] : styles['input']} type={'number'}
                        value={input.attack}
                        name='attack'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.attack && (
                            <label className={error['danger']}>{errors.attack}</label>
                        )
                    }
                </div>
                <div>
                    { errors.attack ? active = true : active = false}
                    <label>Defense: </label>
                    <input disabled={active} className={errors.defense ? error['input'] : styles['input']} type={'number'}
                        value={input.defense}
                        name='defense'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.defense && (
                            <label className={error['danger']}>{errors.defense}</label>
                        )
                    }
                </div>
                <div>
                    { errors.defense ? active = true : active = false}
                    <label>Speed: </label>
                    <input disabled={active} className={errors.speed ? error['input'] : styles['input']} type={'number'}
                        value={input.speed}
                        name='speed'
                        onChange={(e)=>handleInput(e)}
                    /> {
                        errors.speed && (
                            <label className={error['danger']}>{errors.speed}</label>
                        )
                    }
                </div>
                
                { input.name && !errors.name && input.types.length>0 && !errors.health && !errors.height && !errors.attack && !errors.defense && !errors.weight && !errors.speed ?
                <button className={styles['btn_create']} type="submit"  disabled={false} >Create pokemon</button>
                : <button className={styles['btn_create']} type="submit" disabled={true} >Create pokemon</button>

                } 
                   
                        
                        
            </form>

        </div>
    )
}