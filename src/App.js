import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';
import StockScreen from './screens/StockScreen';
import store from './store/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">React Shopping Cart</Link>
              <div className="header-admin">
                <Link to="/stock">Create Product</Link>
                <Link to="/admin">Admin</Link>
              </div>
            </header>
            <main>
              <Route path="/admin" component={AdminScreen} />
              <Route path="/stock" component={StockScreen} /> 
              <Route path="/" component={HomeScreen} exact />
            </main>
            <footer>
              All right is reserved.
          </footer>
          </div>
        </BrowserRouter>
      </Provider>  
    );
  }
};

export default App;