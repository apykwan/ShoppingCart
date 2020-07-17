import React, { Component } from 'react'

import { connect } from 'react-redux';
import Modal from "react-modal";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import { removeFromCart } from '../store/actions/cartActions';
import { createOrder, clearOrder } from '../store/actions/orderActions';
import formatCurrency from "../utils/util";

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showCheckout: false,
            name: '',
            email: '',
            address: ''
        }
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        this.props.createOrder(order);
    };

    closeModal = () => {
        this.props.clearOrder();
    }

    render() {
        const {cartItems, order} = this.props;
        return (
            <div>
                {
                    cartItems.length === 0
                        ? <div className="cart cart-header">Cart is empty </div>
                        : <div className="cart cart-header">You have {cartItems.length} in the car{" "}</div>
                }
                {
                    order && (
                        <Modal
                            isOpen={true}
                            onRequestClose={this.closeModal}
                        >
                            <Zoom>
                                <button 
                                    className="close-modal"
                                    onClick={this.closeModal}
                                >
                                    X
                                </button>
                                <div className="order-details">
                                    <h3 className="success-message">Your Order Has Been Placed!!</h3>
                                    <h2>Order# {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>total:</div>
                                            <div>{formatCurrency(order.total)}</div>
                                        </li>
                                        <li>
                                            <div>Cart Items:</div>
                                            <div>{order.cartItems.map(item => (
                                                <div>
                                                    {item.count} * {item.title}
                                                </div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
                <div>
                    <div className="cart">
                        <Fade left cascade={true}>
                            <ul className="cart-items">
                                {cartItems.map((item) => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count}{" "}
                                                <button
                                                    className="button"
                                                    onClick={() => this.props.removeFromCart(item)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>   
                    </div>
                    {
                        cartItems.length > 0 && (
                            <div>
                                <div className="cart">
                                    <div className="total">
                                        <div>
                                            Total:
                                            {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                                        </div>
                                        <button
                                            className="button primary"
                                            onClick={() => this.setState({ showCheckout: true })}
                                        >
                                            Procced
                                        </button>
                                    </div>
                                </div>
                                {
                                    this.state.showCheckout && (
                                        <Fade right cascade={true}>
                                            <div className="cart">
                                                <form onSubmit={this.createOrder}>
                                                    <ul className="form-container">
                                                        <li>
                                                            <label>Name</label>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                required
                                                                value={this.state.name}
                                                                onChange={this.handleInput}
                                                            />
                                                        </li>
                                                        <li>
                                                            <label>Address</label>
                                                            <input
                                                                name="address"
                                                                type="text"
                                                                required
                                                                value={this.state.address}
                                                                onChange={this.handleInput}
                                                            />
                                                        </li>
                                                        <li>
                                                            <label>Email</label>
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                required
                                                                value={this.state.email}
                                                                onChange={this.handleInput}
                                                            />
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="submit"
                                                                className="button primary"
                                                            >
                                                                Checkout
                                                        </button>
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div>
                                        </Fade>
                                    )}
                            </div>
                        )}
                </div>
            </div>
        );
    }
};

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder }
)(Cart);
