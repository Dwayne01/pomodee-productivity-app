import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Friends from './pages/Friends';
import Analysis from './pages/Analysis';
import HallOfFame from './pages/Hall_of_fame';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationContextProvider } from './context/NotificationContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationContextProvider>
        <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/timer/:roomName" component={Home} />
            <Route exact path="/friends" component={Friends} />
            <Route path="/stats" component={Analysis} />
            <Route path="/hallOfFame" component={HallOfFame} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Landing} />
            <Route>Not Found</Route>
          </Switch>
        </NotificationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
