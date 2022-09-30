
const initialState = {
    pokemons : [],
    allpokemons: [],
    types: [],
    pokemonsDb: [],
    detail: [],
    alltypes: []
}


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_POKEMONS':
          const filterDb = action.payload.filter(e => e.fromDb === true)
        
            return {
                ...state,
                pokemons: action.payload,
                allpokemons: action.payload,
                pokemonsDb: filterDb
            }
        case 'GET_TYPE':
            let type=[]
            state.pokemons?.map(e => {
                if (e.types.length > 1) {
            for (let i = 0; i < e.types.length; i++) {
                    
                 type = [...type, e.types[i]]
                    }
                } else {
                    type = [...type, ...e.types]
                }
            })
            const typeUnique = [...new Set(type)]
            
            return {
                ...state,
                types: typeUnique
            }
        case 'GET_ORDER_NAME':
            const pokemonByOrder = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    } if (b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    } if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: pokemonByOrder
            }
        case 'GET_POKEMONS_CREATED':
            
            const filter = action.payload === 'All' ? state.allpokemons
                : state.allpokemons.filter((e) => e.fromDb === Boolean(action.payload))


            return {
                ...state,
                pokemons: filter

            }
        case 'GET_POKEMONS_TYPE':
            const filterType = action.payload === 'All' ? state.allpokemons
                : state.pokemons.filter(p => p.types.includes(action.payload))

            return {
                ...state,
                pokemons: filterType
            }
        case 'GET_POKEMONS_NAME':
  
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_POKEMONS_ID':
        
            return {
                ...state,
                detail: action.payload
            }
        case 'DELETE_POKEMON':
        
            return {
                ...state,
            }
        case 'CLEAR':
            return {
                ...state,
              detail:[]
            }
        case 'POST_POKEMON':
        
            return {
                ...state,
                
            }
        case 'GET_TYPES':
        
            return {
                ...state,
                alltypes: action.payload
            }
        default:
            return state
    }

}
    



export default rootReducer;