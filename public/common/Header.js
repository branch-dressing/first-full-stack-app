import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <div>
            <h1>BOOKS!</h1>
            <ul>
                <a href="./index.html">Home</a>
                <a href="./book-index.html">Book List</a>
                <a href="./book-form.html">Add Book - (not active)</a>
            </ul>
        <div>
        `
    }
}

export default Header;