import React, { Component } from 'react';

class PostScroller extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.props.postsToLoad) {
      const windowHeight = window.innerHeight || document.documentElement.offsetHeight;
      const docHeight = Math.max(document.body.scrollHeight,
                                document.body.offsetHeight,
                                document.documentElement.clientHeight,
                                document.documentElement.scrollHeight,
                                document.documentElement.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        this.props.onLoadPosts();
      }
    }
  }

  render() {
    return (
      <div className="post-scroller" />
    );
  }
}

PostScroller.propTypes = {
  postsToLoad: React.PropTypes.bool.isRequired,
  onLoadPosts: React.PropTypes.func.isRequired,
};

export default PostScroller;
