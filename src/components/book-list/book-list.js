import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import withBookstoreService from '../hoc/with-bookstore-service';
import { booksLoaded, booksRequested, booksError, bookAddedToCart } from '../../actions';
import { bindActionCreators } from 'redux';

import './book-list.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

class BookList extends Component {

  componentDidMount () {
    this.props.fetchBooks();
  }

  render () {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <ul className="book-list row">
        {
          books.map((book) => {
            return (
              <li key={book.id} className="col-sm-6"><BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)}/></li>
            )
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookList.books,
    loading: state.bookList.loading,
    error: state.bookList.error
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;

  return {
    fetchBooks: () => {
      dispatch(booksRequested());
      bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(booksError(error)));
    },
    onAddedToCart: (id) => {
      dispatch(bookAddedToCart(id));
    }
  }
};

export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
