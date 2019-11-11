import Component from '../Component.js';
import Header from '../common/Header.js';
import BookForm from './bookForm.js';
import { getGenres } from '../services/book-api.js'

class BookFormApp extends Component {
    async onRender(el) {
        const header = new Header({ title: 'Add a Book' });
        el.prepend(header.renderDOM());

        const main = el.querySelector('main');
         
        const genres = await getGenres();
        const bookForm = new BookForm({ genres });
        main.appendChild(bookForm.renderDOM());
    }

    renderHTML() {
        console.log('bookFormApp.js')
        return /*html*/`
            <div>
                <main></main>
            <div>
            `;
    }
}

export default BookFormApp;