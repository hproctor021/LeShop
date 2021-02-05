import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'



const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        {/* adds padding to the container */}
        <Container>

          <Route 
          path='/'
          component={HomeScreen}
          exact
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

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
