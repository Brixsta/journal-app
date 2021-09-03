 import React from 'react';
 import PreviousPosts from './PreviousPosts';
 import axios from 'axios';
 import JournalCanvas from './JournalCanvas';
 
class Journal extends React.Component {
    constructor () {
        super();

        this.state = {
            posts: [],
            currentPostContent: '',
            currentPostId: null
        }

        this.getPostContentById = this.getPostContentById.bind(this);
        this.editPostContent = this.editPostContent.bind(this);
        this.getCurrentPostId = this.getCurrentPostId.bind(this);
        this.deleteItemById = this.deleteItemById.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
    }

    async componentDidMount () {
        const res = await axios.get('http://localhost:9001/api/journal');
        this.setState({posts: [...res.data]}); 
    }

    async getPostContentById (id) {
        const res = await axios.get('http://localhost:9001/api/journal');
        const postContent = res.data.filter(item => item.id === id)[0];
        
        console.log(postContent, 'heres the postContent')

        if(postContent) {
            this.setState({currentPostContent: postContent.content});
        }
    }

    getCurrentPostId (id) {
        this.setState({currentPostId: id});
    }

    editPostContent (value) {
        this.setState({currentPostContent: value})
    }

    async deleteItemById (id) {
        let posts = this.state.posts.filter(item => item.id !== id);
        let sortedPosts = posts.sort((a,b)=>{
            return a.id - b.id
        });
        await axios.delete(`http://localhost:9001/api/journal/${id}`)

        this.setState({posts: [...sortedPosts], currentPostContent: ''});
    }

    addNewPost () {

    }

    render () {
        return (
            <div className="journal-container">
                <h1 className="journal-title">My Journal</h1>
                <section className="journal-content">
                    <PreviousPosts 
                    posts={this.state.posts}
                    getPostContentById={this.getPostContentById}
                    getCurrentPostId={this.getCurrentPostId}
                    deleteItemById={this.deleteItemById}
                    />
                    <JournalCanvas
                    posts={this.state.posts}
                    currentPostContent={this.state.currentPostContent}
                    currentPostId={this.state.currentPostId}
                    editPostContent={this.editPostContent}
                    />
                </section>
                <div className="journal-footer">
              
                </div>
            </div>
        );
    }
}

export default Journal;