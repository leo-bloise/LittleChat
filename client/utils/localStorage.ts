export function saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function retrieveFromLocalStorage(key: string) {
    return localStorage.getItem(key);
}

export function deleteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
}