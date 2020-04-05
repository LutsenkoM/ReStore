export default class BookStoreService {

  data = [
    { id: 1,
      title: 'Book name #1',
      author: 'Popular Author 1',
      price: 32,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/91P67FPmyvL._AC_SX184_.jpg'
    },
    { id: 2,
      title: 'Book name #2',
      author: 'Popular Author 2',
      price: 45,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/810QUFdl+0L._AC_SX184_.jpg'
    },
    { id: 3,
      title: 'Book name #3',
      author: 'Popular Author 3',
      price: 55,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51PHWzGBrAL._SX360_BO1,204,203,200_.jpg'
    },
    {
      id: 4,
      title: 'Book name #4',
      author: 'Popular Author 4',
      price: 55,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51HIUjgGjzL._SX351_BO1,204,203,200_.jpg'
    },
    {
      id: 5,
      title: 'Book name #5',
      author: 'Popular Author 5',
      price: 55,
      coverImage: 'https://m.media-amazon.com/images/I/510Uf0L4pPL._SY346_.jpg'
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
