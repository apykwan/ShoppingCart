import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createProduct } from '../store/actions/productActions';

class StockScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            image: null,
            price: "",
            availableSizes: [],
            stock: "",
            uploading: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleAvailableSize = this.handleAvailableSize.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    };
    
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
       
    };

    handleAvailableSize(e) {
        let sizeArr = [...this.state.availableSizes];
        const value = e.target.value;
        const index = sizeArr.findIndex( size => size === value)  ;
        if (index > -1) {
            sizeArr = [...sizeArr.slice(0, index), ...sizeArr.slice(index + 1)];
        } else {
            sizeArr.push(value);
        }
        this.setState({ availableSizes: sizeArr });
    };

    handleSubmit(e) {
        e.preventDefault();

        const product = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            availableSizes: this.state.availableSizes,
            stock: this.state.stock
        };
        this.props.createProduct(product);
        this.props.history.push('/');
    };

    handleUpload(e) {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);

        this.setState({ uploading: true });

        axios.post('/api/uploads', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({ image: response.data});
            this.setState({ uploading: false });
        }).catch(err => {
            console.log(err);
            this.setState({ uploading: false });
        });
    };

    render() {
        const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        return (
            <div className="stock-form">
                <form onSubmit={this.handleSubmit}>
                    <ul className="form-container">
                        <li>
                            <label>Product Title</label>
                            <input
                                name="title"
                                type="text"
                                required
                                value={this.state.title}
                                onChange={this.handleInput}
                            />
                        </li>
                        <li>
                            <label>Price</label>
                            <input
                                name="price"
                                type="number"
                                required
                                value={this.state.price}
                                onChange={this.handleInput}
                            />
                        </li>
                        <li className="availableSize">
                            <label>Available Sizes</label>
                            { 
                                sizes.map(size => (
                                    <label key={size}>
                                        <input 
                                            type="checkbox" 
                                            value={size} 
                                            onChange={this.handleAvailableSize} 
                                        />
                                        {size}
                                    </label>
                                ))
                            }
                        </li>
                        <li>
                            <label>Stock Available</label>
                            <input
                                name="stock"
                                type="number"
                                required
                                value={this.state.stock}
                                onChange={this.handleInput}
                            />
                        </li>
                        <li>
                            <label>Upload Product Image</label>
                            <input
                                type="file"
                                onChange={this.handleUpload}
                            />
                            {this.state.uploading && <div>Uploading...</div>}
                        </li>
                        <li>
                            <label>description</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                cols="50"
                                value={this.state.description}
                                onChange={this.handleInput}
                            />
                        </li>
                        <li>
                            <button
                                type="submit"
                                className="button primary"
                            >
                                submit
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        )
    }
};

export default connect("", { createProduct })(StockScreen);
