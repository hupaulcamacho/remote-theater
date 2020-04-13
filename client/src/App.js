import React from 'react';
import Navbar from './Components/Navbar'
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Main from './Components/Main'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/main' component={Main} />
      </Switch>
    </div>
  );
}

export default App;
