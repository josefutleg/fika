import React, { Component } from 'react';
class NotesPage extends Component {
    state = {
        notes: null

    }
    // componentDidMount() {
    //     this.setState({ notes: this.props.notes });
    //     console.log("line 8")
    // }
    render() {
        return (
            <React.Fragment>
                <h1>Notes</h1>
                {this.props.notes.map(x => (
                    <p key={x._id}>
                        {x.text}
                        <button onClick={this.props.handleDelete} data-id={x._id}>delete</button>
                    </p>
                ))}

            </React.Fragment>
        );
    }
}

export default NotesPage;