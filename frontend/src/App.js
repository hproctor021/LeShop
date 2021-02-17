import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'



const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        {/* adds padding to the container */}
        <Container>

          <Route 
          path='/login'
          component={LoginScreen}
          />

          <Route 
            path='/register'
            component={RegisterScreen}
          />

          <Route 
          path='/products/:id'
          component={ProductScreen}
          />

          <Route 
          path='/cart/:id?'
          // the id is going to be optional, so we include a ? after it
          component={CartScreen}
          /> 

          <Route 
          path='/'
          component={HomeScreen}
          exact
          />

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
