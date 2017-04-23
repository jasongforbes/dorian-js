import React, { Component } from 'react';
import PostSummary from './PostSummary';

class PostScroller extends Component {

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
    this.renderPostSummary = this.renderPostSummary.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleViewChange);
    window.addEventListener('resize', this.handleViewChange);
    this.props.onLoadPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts.length !== prevProps.posts.length &&
        this.props.hasPostsToLoad &&
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

  renderPostSummary(key) {
    const post = this.props.getPost(key);
    return (
      <PostSummary
        key={key}
        title={post.frontMatter.title}
        date={post.frontMatter.date}
        body={post.body}
        link={`posts/${key}`}
        banner={post.frontMatter.banner}
        description={post.frontMatter.description}
      />
    );
  }

  render() {
    return (
      <div className="post-scroller">
        {this.props.posts.map(this.renderPostSummary)}
      </div>
    );
  }
}

PostScroller.propTypes = {
  hasPostsToLoad: React.PropTypes.bool.isRequired,
  onLoadPosts: React.PropTypes.func.isRequired,
  posts: React.PropTypes.array.isRequired,
  getPost: React.PropTypes.func.isRequired,
};

export default PostScroller;
