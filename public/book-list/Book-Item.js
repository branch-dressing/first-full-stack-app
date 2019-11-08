import Component from '../Component.js';

class BookItem extends Component {
    renderHTML() {
        const book = this.props.book;

        let binding = 'Hardback';
        if(!book.is_hardback) binding = 'Paperback';

        return/*html*/`
            <li class="book-item">
                <div class="info-container">
                    <h2>${book.title}</h2>
                    <h3>by ${book.author}</h3>
                </div>
                <div class="image-container">
                    <img src="${book.url}" alt="${book.title} image">
                </div>
                <ul>
                    <li>Pages: ${book.pages}</li>
                    <li>Genre: ${book.genre}</li>
                    <li>Hardback: ${binding}</li>
            </li>
`;
}
}

export default BookItem;