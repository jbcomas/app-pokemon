import axios from 'axios'



export function getPokemons() {
    return async function (dispatch) {

        var json = await axios.get('http://localhost:3001/pokemons/', {
        })

        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })

    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types/', {
        })
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })

    }

}
export function getType() {

    return {
        type: 'GET_TYPE'

    }
}
export function filterPokemons(payload) {
    return {
        type: 'GET_POKEMONS_CREATED',
        payload
    }
}
export function orderByName(payload) {
    return {
        type: 'GET_ORDER_NAME',
        payload
    }
}

export function filterPokemonsType(types) {
        return {
          type: 'GET_POKEMONS_TYPE',
          payload: types,
        };
      
}
export function getPokemonsName(name)  {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/pokemons/?name=${name}`, {
        })

        return dispatch({
            type: 'GET_POKEMONS_NAME',
            payload: json.data
        })

    }
}
export function getPokemonsId(id)  {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/pokemons/${id}`, {
        })

        return dispatch({
            type: 'GET_POKEMONS_ID',
            payload: json.data
        })

    }

    }
export function postPokemon(payload)  {
    return async function (dispatch) {
        const response = await axios.post(`http://localhost:3001/pokemons/`, payload)
        console.log(response);
        return alert(response.data)
    }

    }

    export function clear(payload) {
        return {
          type: 'CLEAR',
          payload: payload,
        };
    }
    export function deletePokemon(id)  {
        return async function (dispatch) {
            var json = await axios.delete(`http://localhost:3001/pokemons/${id}`, {
            })
            console.log(json);
            return alert(json.data)
            
        }
    }
