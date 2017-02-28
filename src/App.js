import React from 'react';
import Header from './components/Header';
import PostScroller from './components/PostScroller';
import { importAll } from './utility';
import avatar from '../images/avatar.svg';

const postFrontMatter = importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=date,expected[]=author,expected[]=title!../posts/', true, /\.md$/));
const postFile = importAll(require.context('!file?name=posts/[name].html!./loaders/markdown-loader!../posts/', true, /\.md$/));

class App extends React.Component {
  constructor() {
    super();
    this.handleLoadPosts = this.handleLoadPosts.bind(this);
    const posts = postFrontMatter.map((e, i) => ({
      frontMatter: e,
      file: postFile[i],
      loaded: false,
      body: null,
    })).filter(post => post.frontMatter.isValid);
    this.state = {
      posts,
    };
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
