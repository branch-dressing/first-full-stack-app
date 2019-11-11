const URL = '/api';

export async function getBooks() {
    const url = `${URL}/books`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getGenres() {
    const url = `${URL}/genres`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function addBook(book) {
    const url = `${URL}/books`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cat)
        });

        const data = await response.json();
        return data;
}