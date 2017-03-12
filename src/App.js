import React from 'react';
import slugify from 'slugify';
import Header from './components/Header';
import PostScroller from './components/PostScroller';
import { importAll } from './utility';
import avatar from '../images/avatar.svg';

const postFrontMatter = importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=date,expected[]=title!../posts/', true, /\.md$/));
const postFile = importAll(require.context('!file?name=media/posts/[name].[hash].html!./loaders/markdown-loader!../posts/', true, /\.md$/));

class App extends React.Component {
  constructor() {
    super();
    this.handleLoadPosts = this.handleLoadPosts.bind(this);
    this.getPostsToLoad = this.getPostsToLoad.bind(this);
    this.loadPost = this.loadPost.bind(this);
    this.getPost = this.getPost.bind(this);
    this.getPostOrdering = this.getPostOrdering.bind(this);
    this.getData = this.getData.bind(this);

    const posts = postFrontMatter.map((e, i) => ({
      frontMatter: e,
      file: postFile[i],
      loaded: false,
      isLoading: false,
      body: null,
    }))
      .filter(post => post.frontMatter.isValid)
      // sort by title so similar titles are slugified in order with proper titles
      .sort((a, b) => {
        if (a.frontMatter.title.toLowerCase() < b.frontMatter.title.toLowerCase()) {
          return -1;
        } else if (a.frontMatter.title.toLowerCase() === b.frontMatter.title.toLowerCase()) {
          return a.frontMatter.date < b.frontMatter.date ? -1 : 1;
        }
        return 1;
      })
      .reduce((origPosts, post) => {
        const modifiedPosts = origPosts;
        const title = slugify(post.frontMatter.title.toLowerCase());
        if (title in modifiedPosts) {
          // Duplicate post-title ... append an integer instead of failing
          // Use slugified titles as keys as they must be unique (otherwise will fail to redirect)
          const postRegex = new RegExp(`^${title}(-[\\d]+)?$`, 'i');
          const uniqueID = Object.keys(modifiedPosts).filter(key => postRegex.test(key)).length;
          modifiedPosts[`${title}-${uniqueID}`] = post;
        } else {
          modifiedPosts[title] = post;
        }
        return modifiedPosts;
      }, {});

    this.state = {
      posts,
    };
  }

  getData(key, handleReturn, handleError) {
    if (this.state.posts[key].body) {
      handleReturn(key, this.state.posts[key].body);
    }
    const postRequest = new XMLHttpRequest();
    postRequest.onreadystatechange = () => {
      if (postRequest.readyState === 4) { // Done
        if (postRequest.status === 200) { // OK
          handleReturn(key, postRequest.responseText);
        } else if (handleError) {
          handleError(key);
        }
      }
    };
    postRequest.open('GET', this.state.posts[key].file, true);
    postRequest.send(null);
  }

  getPost(key) {
    return this.state.posts[key];
  }

  getPostsToLoad() {
    return Object.keys(this.state.posts)
      .filter(key => !this.state.posts[key].loaded && !this.state.posts[key].isLoading)
      .sort(this.getPostOrdering);
  }

  getPostOrdering(key1, key2) {
    return (this.state.posts[key1].frontMatter.date <
            this.state.posts[key2].frontMatter.date ? 1 : -1);
  }

  handleLoadPosts() {
    const numPostsToLoad = 1;
    const postsToLoad = this.getPostsToLoad();
    if (postsToLoad.length > 0) {
      postsToLoad.slice(0, numPostsToLoad).forEach((key) => {
        const posts = this.state.posts;
        posts[key].isLoading = true;
        this.setState({ posts });
        this.getData(key, this.loadPost);
      });
    }
  }

  loadPost(key, response) {
    const posts = this.state.posts;
    posts[key].loaded = true;
    posts[key].isLoading = false;
    posts[key].body = response;
    this.setState({ posts });
  }

  render() {
    const loadedPosts = Object.keys(this.state.posts)
      .filter(key => this.state.posts[key].loaded)
      .sort(this.getPostOrdering);
    return (
      <div className="app">
        <Header
          avatar={avatar}
          avatarAlt="Default Image"
          title="My Landing Page"
          description="This is the landing page description."
        />
        <PostScroller
          hasPostsToLoad={loadedPosts.length < Object.keys(this.state.posts).length}
          onLoadPosts={this.handleLoadPosts}
          posts={loadedPosts}
          getPost={this.getPost}
        />
      </div>
    );
  }
}

export default App;
