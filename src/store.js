import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

const logMiddleware = (store) => (next) => (action) => {
  console.log(action.type, store.getState());
  return next(action);
};

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }

  return next(action);
};

// const enhancer = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return originalDispatch({
//         type: action
//       });
//     }
//     return originalDispatch(action);
//   };
//   return store;
// };

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

const myActionCreator= (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'MY_THUNK_ACTION_CALLED'
  }), timeout);
};

store.dispatch(myActionCreator(2000));

store.dispatch("HELLO_WORLD");

export default store;
