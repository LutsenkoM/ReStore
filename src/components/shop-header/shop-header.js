import React from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';
import { allBooksRemovedFromCart, bookAddedToCart, bookRemovedFromCart } from '../../actions';
import { connect } from 'react-redux';

const ShopHeader = ({ orderCount, orderTotal }) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark" href="#">ReStore</div>
      </Link>

      <Link to="/cart">
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {orderCount} items (${orderTotal})
        </div>
      </Link>
    </header>
  );
};


const mapStateToProps = (state) => {
  return {
    orderTotal: state.shoppingCart.orderTotal,
    orderCount: state.shoppingCart.orderCount
  };
};

export default connect(mapStateToProps)(ShopHeader);
