import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { fetchProducts } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import formatCurrency from "../utils/util";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    };

    componentDidMount() {
        this.props.fetchProducts();
    };

    openModal = product => {
        this.setState({ product });
    };

    closeModal = () => {
        this.setState({ product: null });
    };
    
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade={true}>
                    {!this.props.products
                        ? <div>Loading...</div>
                        : (
                            <ul className="products">
                                {this.props.products.map((product) => (
                                    <li key={product._id}>
                                        <div className="product">
                                            <a
                                                href={"#" + product._id}
                                                onClick={this.openModal.bind(this, product)}
                                            >
                                                <img
                                                    className="product-image" 
                                                    src={product.image} 
                                                    alt={product.title} 
                                                />
                                                <p>{product.title}</p>
                                            </a>
                                            <div className="product-price">
                                                <div>{formatCurrency(product.price)}</div>
                                                { product.stock > 0 
                                                    ? (<button
                                                        className="button primary"
                                                        onClick={this.props.addToCart.bind(this, product)}
                                                    >
                                                        Add To Cart
                                                    </button>)
                                                    : (<button className="button">
                                                        SOLD OUT !!!
                                                    </button>)
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )} 
                </Fade>
                {product && (
                    <Modal
                        isOpen={true}
                        onRequestClose={this.closeModal}
                    >
                        <Zoom>
                            <button
                                className="close-modal"
                                onClick={this.closeModal.bind(this)}
                            >
                                X
                            </button>
                            <div className="product-details">
                                <img src={product.image} alt={product.detail} />
                                <div className="product-details-description">
                                    <p><strong>{product.title}</strong></p>
                                    <p><strong>{product.description}</strong></p>
                                    <p>
                                        Avaiable Sizes: {" "}
                                        {product.availableSizes.map(x => (
                                            <span>
                                                {" "}
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                       
                                        {product.stock > 0
                                            ? (<button
                                                className="button primary"
                                                onClick={() => {
                                                    this.props.addToCart(product);
                                                    this.closeModal();
                                                }}
                                            >
                                                Add To Cart
                                            </button>)
                                            : (<button className="button">
                                                SOLD OUT !!!
                                            </button>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
};

export default connect(state => ({
    products: state.products.filteredItems
}), {
    fetchProducts,
    addToCart
})(Products)