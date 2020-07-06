import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">React Shopping Cart</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Route path="/admin" component={AdminScreen} />
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

// addToCart = (product) => {
//   const cartItems = this.state.cartItems.slice();
//   let alreadyInCart = false;
//   cartItems.forEach((item) => {
//     if (item._id === product._id) {
//       item.count++;
//       alreadyInCart = true;
//     }
//   });
//   if (!alreadyInCart) {
//     cartItems.push({ ...product, count: 1 });
//   }
//   this.setState({ cartItems });
//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// };

// createOrder = order => {
//   alert('need to save order for' + order.name);
// };

// removeFromCart = product => {
//   let updatedCartItems;
//   if (product.count === 1) {
//     updatedCartItems = this.state.cartItems.filter(item => item._id !== product._id);
//   } else {
//     updatedCartItems = this.state.cartItems.map(item => {
//       if (item._id === product._id) {
//         item.count = item.count - 1;
//         return {
//           ...item,
//           ...item.count
//         }
//       } else {
//         return item;
//       }
//     })
//   };

//   this.setState({ cartItems: updatedCartItems });
//   localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
// };

 // sortProducts(event) {
  //   const sort = event.target.value;
  //   this.setState(state => ({
  //     sort,
  //     products: state.products
  //     .slice()
  //     .sort((a, b) => (
  //       sort === "lowest" 
  //         ? ((a.price > b.price) ? 1 : -1)
  //         : sort === "highest"
  //           ? ((a.price > b.price) ? -1 : 1)
  //         : ((a._id < b._id) ? 1 : -1 )
  //     ))
  //   }))
  // };

  // filterProducts(event) {
  //   if (event.target.value === "") {
  //     this.setState({ 
  //       size: event.target.value, 
  //       products: data.products 
  //     });
  //   } else {
  //     this.setState({
  //       size: event.target.value,
  //       products: data.products.filter(product => product.availableSizes.some(sizes => sizes === event.target.value))
  //       // data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
  //     });
  //   };
  // };