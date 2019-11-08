import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <div>
            <h1>BOOKS!</h1>
            <ul>
                <li>Home</li>
                <li>Book Table</li>
                <li>About</li>
            </ul>
        <div>
        `
    }
}

export default Header;