import React from 'react';
import './App.css';
import { Navbar } from './section/Homepage/components/nav-footer/Navbar';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Footer } from './section/Homepage/components/nav-footer/footer';
import { HomePage } from './section/Homepage/HomePage';
import { EventsPage } from './section/EventsPage/EventsPage';
import { TicketPage } from './section/EventsPage/TicketPage/TicketPage';

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './authentication/LoginWidget';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { ReviewListPage } from './section/EventsPage/ReviewListPage/ReviewListPage';
import { UpcomingShelfPage } from './section/UpcomingShelf/UpcomingShelfPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };



  return (
   
    <div className='d-flex flex-column min-vh-100'>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar/>
      <div className='flex-grow-1'>

      <Switch>
      <Route path='/' exact>
      <Redirect to='/home' />
      </Route>
      <Route path ='/home' >
      <HomePage/>
      </Route>
      
      <Route path ='/search'>
      <EventsPage/>
      </Route>
      <Route path='/reviewlist/:eventId'>
            <ReviewListPage/>
          </Route>
     <Route path = '/ticket/:eventId'>
     <TicketPage/>
     </Route>
     <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} />
          <SecureRoute path='/upcoming'><UpcomingShelfPage/></SecureRoute>

     </Switch>


       </div>
       <Footer/>
       </Security>
       </div>
  

  );
}



