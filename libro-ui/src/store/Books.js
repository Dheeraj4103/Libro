const Set_Book = "Set_Book";

export function setBook(book) {
    console.log("book", book);
    return {
        type: Set_Book,
        payload: book
    }
};

function booksReducer(
    state = {
        book : {}
    },
    action
) {
    switch (action.type) {
        case "Set_Book":
            return { ...state, book: action.payload }
        default:
            return state
    }
}

export default booksReducer;