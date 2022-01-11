import './App.css';
import React from 'react'
import reducer, {initialState} from "./reducer";
import {StateProvider} from "./StateProvider";
import DesktopEditScreen from './screens/DesktopEditScreen';
import AuthScreen from './screens/AuthScreen';
import { useEffect, useState } from 'react';
import { auth } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ViewingScreen from './screens/ViewingScreen';
import HomeScreen from './screens/HomeScreen';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(authUser => {
        setUser(authUser)
        if (isLoading) setIsLoading(false);
    })
    return() => {
      subscriber()
    }
  }, [])

  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary:{
        main:'#000000'
      }
    },
  });

  if(isLoading) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
      {!user ? 
      (
          <Switch>
            <Route exact path="/" component={HomeScreen}>
            </Route>
            <Route exact path="/authenticate" component={AuthScreen}>
            </Route>
            <Route exact path="/edit">
              <Redirect to="/authenticate"></Redirect>
            </Route>
            <Route path="/:id" component={ViewingScreen}/>
          </Switch>
      )
      :
      (
          <Switch>
            <Route exact path="/">
              <Redirect to="/edit" />
            </Route>
            <Route exact path="/edit" component={DesktopEditScreen}></Route>
            <Route exact path="/authenticate">
              <Redirect to="/edit"></Redirect>
            </Route>
            <Route path="/:id" component={ViewingScreen}/>
          </Switch>
      )}
      </Router>
    </StateProvider>
    </ThemeProvider>
  );
}

export default App;
