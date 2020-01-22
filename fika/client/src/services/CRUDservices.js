export const _newNote = (object) => {
    return fetch("http://localhost:8000/new-note/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then(res => res.json());
};

export const _loadNotes = (id) => {
    return fetch(`http://localhost:8000/notes/user/${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const _deleteNote = (id) => {
    return fetch(`http://localhost:8000/note-remove/${id}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}