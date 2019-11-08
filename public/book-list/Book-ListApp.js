import Component from '../Component.js';
import Header from '../common/Header.js';
import BookList from './BookList.js';
import { getBooks } from '../services/book-api.js';

class BookListApp extends Component {
    onRender(el) {
        const header = new Header({ title: 'List of Books' });
        el.prepend(header.renderDOM());

        const list = new BookList({ books: [] });
        const main = el.querySelector('main');
        main.appendChild(list.renderDOM());

        getBooks().then(books => {
            list.update({ books });
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main></main>
            </div>
        `;
    }
}

export default BookListApp;