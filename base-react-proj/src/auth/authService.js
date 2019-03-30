export const saveToLocalstorage = (name, value) => {
    if (name && value) {
        localStorage.setItem(name, value);
    }
}

export const getFromLocalstorage = (name) => {
    if (name) {
        localStorage.getItem(name);
    }
}

export const clearAllLocalstorage = () => {

}

export const clearOneLocalstorage = (name) => {
    if (name) {
        localStorage.removeItem(name);
    }
}