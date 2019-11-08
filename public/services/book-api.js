const URL = '/api';

export async function getBooks() {
    const url = `${URL}/books`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}