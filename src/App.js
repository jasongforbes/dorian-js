import React from 'react';
import Header from './components/Header';
import PostScroller from './components/PostScroller';
import avatar from '../images/avatar.svg';

class App extends React.Component {
  constructor() {
    super();
    this.handleLoadPosts = this.handleLoadPosts.bind(this);
  }

  componentDidMount() {
    this.handleLoadPosts();
  }

  handleLoadPosts() {
    console.log('loading posts');
  }

  render() {
    return (
      <div className="app">
        <Header
          avatar={avatar}
          avatarAlt="Default Image"
          title="My Landing Page"
          description="This is the landing page description."
        />
        <PostScroller
          postsToLoad
          onLoadPosts={this.handleLoadPosts}
        />
      </div>
    );
  }
}

export default App;
