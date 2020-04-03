export default class BookStoreService {

  data = [
    { id: 1,
      title: 'Book name #1',
      author: 'Popular Author',
      price: 32,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/91P67FPmyvL._AC_SX184_.jpg'
    },
    { id: 2,
      title: 'Book name #2',
      author: 'Popular Author',
      price: 45,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/810QUFdl+0L._AC_SX184_.jpg'
    },
    { id: 3,
      title: 'Book name #3',
      author: 'Popular Author',
      price: 55,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51PHWzGBrAL._SX360_BO1,204,203,200_.jpg'
    }
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data)
      }, 1000);
    });
  }

}
