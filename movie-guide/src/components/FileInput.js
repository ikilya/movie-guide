import React, { PureComponent } from "react";

import './FileInput.css';

class FileInput extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const file = this.fileInput.current.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            this.props.handleFileString(reader.result);
        };

        reader.onerror = () => {
            console.log(reader.error);
        };
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='importMoviesForm'>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit" className='button'>Import movies</button>
            </form>
        );
    }
}

export default FileInput;