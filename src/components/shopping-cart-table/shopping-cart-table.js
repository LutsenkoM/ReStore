import React from 'react';
import { connect } from 'react-redux';
import { bookAddedToCart, bookRemovedFromCart, allBooksRemovedFromCart } from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({items, orderTotal, onIncrease, onDecrease, onDelete}) => {
  const renderRow = (item, index) => {
    const { id, title, count, total } = item;
    return (
      <tr key={id}>
        <td>{++index}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
          <button onClick={() => onDelete(id)} className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button onClick={() => onIncrease(id)} className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
          <button onClick={() => onDecrease(id)} className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    )
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Count</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
          { items.map(renderRow) }
        </tbody>
      </table>

      <div className="total">
        Total: ${orderTotal}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('EEE', state.shoppingCart.cartItems);
  return {
    items: state.shoppingCart.cartItems,
    orderTotal: state.shoppingCart.orderTotal
  };
};

const mapDispatchToProps = {
  onIncrease: bookAddedToCart,
  onDecrease: bookRemovedFromCart,
  onDelete: allBooksRemovedFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
