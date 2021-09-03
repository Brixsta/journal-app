import React from 'react';
import PostTitleItem from './PostTitleItem';

class PreviousPosts extends React.Component {
    render () {
        return (
            <aside className="previous-posts-container">
                <ul className="previous-post-list">
                    {this.props.posts.map((item)=>{
                        return (
                        <PostTitleItem 
                        key={item.id} 
                        id={item.id}
                        postTitle={item.postingdate} 
                        getCurrentPostId={this.props.getCurrentPostId}
                        getPostContentById={this.props.getPostContentById}
                        deleteItemById={this.props.deleteItemById}
                        />
                        )
                    })}
                </ul>
            </aside>
        )
    }
}

export default PreviousPosts;