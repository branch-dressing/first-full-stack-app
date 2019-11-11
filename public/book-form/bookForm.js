import Componet from '../Component.js';
import { addBook } from '../services/book-api.js';

class BookForm extends Componet {
    onRender(form) {
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);
            
            const book = {
                title: formData.get('title'),
                author: formData.get('author'),
                genre_id: parseInt(formData.get('genre_id')),
                img: formData.get('img'),
                pages: formData.get('pages'),
                is_hardback: formData.get('is_hardback') === 'on'
            };

            try {
                const saved = await addBook(book);
                window.location = 'book-index.html'
            }
            catch (err) {
                console.log('book not saved: ' + err);
            }
        })
    }

    renderHTML() {
        console.log('bookForm.js')
        const genres = this.props.genres;
        const optionsList = genres.map(genre => {
            return `<option value="${genre.id}">${genre.genre}</option>`;
        });

        const joinedOptionsList = optionsList.join('');

        return /*html*/`
            <form class="book-form">
                <p>
                    <label for="title">Title</label>
                    <input id="title" name="title" required placeholder="Book Title">
                </p>
                <p>
                    <label for="author">Author</label>
                    <input id="author" name="author" required placeholder="Jane Doe">
                </p>
                <p>
                    <label for="genre">Genre</label>
                    <select id="genre" name="genre_id" required>
                        <option disabled selected>&lt;select a genre&gt;</option>
                        ${joinedOptionsList}
                    </select>
                </p>
                <p>
                    <label for="url">Image Url</label>
                    <input id="url" name="url" required placeholder="https://book-cover.jpg">
                </p>
                <p>
                    <label for="pages">Number of Pages</label>
                    <input id="pages"
                        name="pages"
                        required
                        pattern="[0-9]+"
                        placeholder="000"
                        title="Number of Pages">
                </p>
                <p>
                    <label for="is_hardback">Binding</label>
                        <input id="is_hardback" name="is_hardback" type="checkbox">Hardback
                </p>

                <p>
                    <button>Add this Book</button>
                </p>
            </form>
        `;
    }
}

export default BookForm;