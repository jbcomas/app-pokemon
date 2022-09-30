import './App.css';
import {BrowserRouter, Route, Switch, useParams} from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Home from './component/Home';
import Detail from './component/Detail';
import CreatePokemon from './component/CreatePokemon';





function App() {
 
  return (
    <BrowserRouter>
    {/* <div className="App"> */}
      <Switch>
    <Route exact path='/' component={LandingPage}/>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/home/:id' component={Detail}/>
    <Route path='/pokemons/' component={CreatePokemon}/>
      </Switch>
    {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
