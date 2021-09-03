import React from 'react';

class PostTitleItem extends React.Component {
    constructor () {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (evt) {
        evt.preventDefault();
        this.props.getPostContentById(this.props.id);
        this.props.getCurrentPostId(this.props.id);
    }

    render () {
        return (
            <div className="list-item-container">
            <li 
            onClick={this.handleClick}
            className="previous-post-item">
                {this.props.postTitle}
                
            </li>
                <span 
                    onClick={()=>{
                        this.props.deleteItemById(this.props.id);
                        console.log('clicked')
                    }}
                    className={'delete-button'}>delete
                </span>
            </div>
        )
    }
}

export default PostTitleItem;