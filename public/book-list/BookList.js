import Component from '../Component.js';
import BookItem from './Book-Item.js';

class BookList extends Component {

    onRender(el) {
        const books = this.props.books;

        books.forEach(book => {
            const props = { book };
            const bookItem = new BookItem(props);
            const bookItemDOM = bookItem.renderDOM();
            el.appendChild(bookItemDOM);
        });
    }

    renderHTML() {
        return /*html*/`
        <ul class="books"></ul>
        `;
    }
}

export default BookList;