import React, { Component } from 'react';

class PostScroller extends Component {

  static renderPostSummary(key) {
    return <p key={key}>{key}</p>;
  }

  static isDocumentSmallerThanTwiceWindow() {
    const windowHeight = window.innerHeight || document.documentElement.offsetHeight;
    const docHeight = Math.max(document.body.scrollHeight,
                              document.body.offsetHeight,
                              document.documentElement.clientHeight,
                              document.documentElement.scrollHeight,
                              document.documentElement.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    return docHeight < 2 * windowBottom;
  }

  constructor(props) {
    super(props);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleViewChange);
    window.addEventListener('resize', this.handleViewChange);
    this.props.onLoadPosts();
  }

  componentDidUpdate() {
    if (this.props.hasPostsToLoad &&
        PostScroller.isDocumentSmallerThanTwiceWindow()) {
      this.props.onLoadPosts();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleViewChange);
    window.removeEventListener('resize', this.handleViewChange);
  }

  handleViewChange() {
    if (this.props.hasPostsToLoad &&
        PostScroller.isDocumentSmallerThanTwiceWindow()) {
      this.props.onLoadPosts();
    }
  }

  render() {
    return (
      <div className="post-scroller">
        {this.props.posts.map(PostScroller.renderPostSummary)}
      </div>
    );
  }
}

PostScroller.propTypes = {
  hasPostsToLoad: React.PropTypes.bool.isRequired,
  onLoadPosts: React.PropTypes.func.isRequired,
  posts: React.PropTypes.array.isRequired,
};

export default PostScroller;
