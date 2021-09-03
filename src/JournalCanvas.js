import React from 'react';
import axios from 'axios';

class JournalCanvas extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            empty: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit (evt) {
        evt.preventDefault();
        await axios.put(`http://localhost:9001/api/journal/${this.props.currentPostId}`, {content: evt.target.textContent.slice(0, evt.target.textContent.length-7)});
    }


    render () {
        return (
                <div className="journal-canvas">
                    <form 
                    onSubmit={this.handleSubmit}
                    className="journal-canvas-form">
                        <textarea 
                        className="journal-canvas-text"
                        value={this.props.currentPostContent}
                        onChange={(evt)=>{
                            this.props.editPostContent(evt.target.value);
                            this.setState({empty:false});
                        }}
                        >
                        </textarea>
                        <div className="journal-controls">
                        <button 
                            disabled={this.state.empty ? true : false}
                            className="save-button">Save</button>
                            <button className="add-button">Add</button>
                        </div>
                    </form>
                </div>
           
        )
    }
}

export default JournalCanvas;