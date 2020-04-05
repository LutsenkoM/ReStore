
const initialState = {
  bookList: {
    books: [],
    loading: true,
    error: null
  },
  shoppingCart: {
    cartItems: [],
    orderTotal: 0,
    orderCount: 0
  }
};

const updateCartItems = (cartItems, item, index) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, index),
      ...cartItems.slice(index + 1)
    ];
  }

  if (index === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, index),
    item,
    ...cartItems.slice(index + 1)
  ];

};

const updateCartItem = (book, item, quantity) => {
  if (item) {
    return {
      ...item,
      count: item.count + quantity,
      total: quantity * book.price + item.total
    };
  } else {
    return {
      id: book.id,
      title: book.title,
      count: 1,
      total: book.price
    };
  }
};

const calcTotal = (items) => {
  let total = {
    price: initialState.shoppingCart.orderTotal,
    count: initialState.shoppingCart.orderCount
  };
  items.forEach((item) => {
    total.price += item.total;
    total.count += item.count;
  });
  return total;
};

const updateOrder = (state, bookId, quantity) => {
  const book = state.bookList.books.find((book) => book.id === bookId);
  const itemIndex = state.shoppingCart.cartItems.findIndex(({id}) => id === bookId);
  const item = state.shoppingCart.cartItems[itemIndex];

  const newItem = updateCartItem(book, item, quantity);
  const updatedCart = updateCartItems(state.shoppingCart.cartItems, newItem, itemIndex);
  let { price, count } = calcTotal(updatedCart);

  return {
    orderTotal: price,
    orderCount: count,
    cartItems: updatedCart
  };
};

const updateBookList = (state, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: state.books,
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload
      };
  }

};

const updateShoppingCart = (state, action) => {

  switch (action.type) {
    case 'BOOK_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1);

    case 'BOOK_REMOVED_FROM_CART':
      return updateOrder(state, action.payload, -1);

    case 'ALL_BOOKS_REMOVED_FROM_CART':
      const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);
  }

};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case 'FETCH_BOOKS_REQUEST':
    case 'FETCH_BOOKS_SUCCESS':
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        bookList: updateBookList(state, action)
      };

    case 'BOOK_ADDED_TO_CART':
    case 'BOOK_REMOVED_FROM_CART':
    case 'ALL_BOOKS_REMOVED_FROM_CART':
      return {
        ...state,
        shoppingCart: updateShoppingCart(state, action)
      };

    default:
      return state;
  }
};

export default reducer;
