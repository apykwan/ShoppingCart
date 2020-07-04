import React from 'react';

import data from "./data.json";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    };
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
  };
  
  sortProducts(event) {
    const sort = event.target.value;
    this.setState(state => ({
      sort,
      products: state.products
      .slice()
      .sort((a, b) => (
        sort === "lowest" 
          ? ((a.price > b.price) ? 1 : -1)
          : sort === "highest"
            ? ((a.price > b.price) ? -1 : 1)
          : ((a._id < b._id) ? 1 : -1 )
      ))
    }))
  };

  filterProducts(event) {
    if (event.target.value === "") {
      this.setState({ 
        size: event.target.value, 
        products: data.products 
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.some(sizes => sizes === event.target.value))
        // data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      });
    };
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  createOrder = order => {
    alert('need to save order for' + order.name);
  };

  removeFromCart = product => {
    let updatedCartItems;
    if (product.count === 1) {
      updatedCartItems = this.state.cartItems.filter(item => item._id !== product._id);
    } else {
      updatedCartItems = this.state.cartItems.map(item => {
        if (item._id === product._id) {
          item.count = item.count - 1;
          return {
            ...item,
            ...item.count
          }
        } else {
          return item;
        }
      })
    };

    this.setState({ cartItems: updatedCartItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                createOrder={this.createOrder}
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
     </footer>
      </div>
    );
  }
};

export default App;
