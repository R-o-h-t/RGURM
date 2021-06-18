import React from 'react' 
import { HashRouter, Route, Switch } from 'react-router-dom' 
import { Header } from '../components/Header/Header' 
import Home from './Home/Home' 
import { ProductPage} from './ProductPage/ProductPage' 

import './App.css' 

const App = () => {
  return (
    <HashRouter>
      {/* Applications Router */}
      <Header/>
      <section>
        <Switch>
          {/* Differents Route with their path */}
          <Route path="/" exact={ true }>
            <Home/>
          </Route>
          <Route path="/product/:id" component={ProductPage}/>
        </Switch>
      </section>
    </HashRouter>
  ) 
}

export default App 
