import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import PostScroller from './components/PostScroller';
import NotFound from './components/NotFound';
import Page from './components/Page';
import Post from './components/Post';
import { importAll, loadMarkdown } from './utility';
import avatar from '../images/avatar.svg';
import config from './config.json';


class App extends React.Component {
  static getData(key, collection, handleReturn, handleError) {
    if (collection[key].body) {
      handleReturn(key, collection.posts[key].body);
    }
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) { // Done
        if (request.status === 200) { // OK
          handleReturn(key, request.responseText);
        } else if (handleError) {
          handleError(key);
        }
      }
    };
    request.open('GET', collection[key].file, true);
    request.send(null);
  }

  static updateFile(collection, key, response) {
    const modifiedCollection = collection;
    if (modifiedCollection[key].isLoading) {
      modifiedCollection[key].loaded = true;
      modifiedCollection[key].isLoading = false;
    }
    modifiedCollection[key].body = response;
    return modifiedCollection;
  }

  constructor() {
    super();
    this.getPage = this.getPage.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.getPost = this.getPost.bind(this);
    this.getPostData = this.getPostData.bind(this);
    this.getPostOrdering = this.getPostOrdering.bind(this);
    this.getPostsToLoad = this.getPostsToLoad.bind(this);
    this.handleNavbarFixed = this.handleNavbarFixed.bind(this);
    this.handleLoadPosts = this.handleLoadPosts.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.loadPost = this.loadPost.bind(this);

    const posts = loadMarkdown(
      importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=date,expected[]=title!../posts/', true, /\.md$/)),
      importAll(require.context('!file?name=media/posts/[name].[hash].html!./loaders/markdown-loader!../posts/', true, /\.md$/)),
      (a, b) => {
        if (a.frontMatter.title.toLowerCase() < b.frontMatter.title.toLowerCase()) {
          return -1;
        } else if (a.frontMatter.title.toLowerCase() === b.frontMatter.title.toLowerCase()) {
          return a.frontMatter.date < b.frontMatter.date ? -1 : 1;
        }
        return 1;
      });

    const pages = loadMarkdown(
      importAll(require.context('!json!./loaders/frontmatter-loader?expected[]=title,expected[]=order!../pages/', true, /\.md$/)),
      importAll(require.context('!file?name=media/pages/[name].[hash].html!./loaders/markdown-loader!../pages/', true, /\.md$/)),
    );

    this.state = {
      pages,
      posts,
      contentClassname: 'content',
    };

    Object.keys(pages).forEach(key =>
      this.getPageData(key, this.loadPage));
  }


  getPage(key) {
    return this.state.pages[key];
  }

  getPageData(key, handleReturn, handleError) {
    return App.getData(key, this.state.pages, handleReturn, handleError);
  }

  getPost(key) {
    return this.state.posts[key];
  }

  getPostData(key, handleReturn, handleError) {
    return App.getData(key, this.state.posts, handleReturn, handleError);
  }

  getPostOrdering(key1, key2) {
    return (this.state.posts[key1].frontMatter.date <
            this.state.posts[key2].frontMatter.date ? 1 : -1);
  }

  getPostsToLoad() {
    return Object.keys(this.state.posts)
      .filter(key => !this.state.posts[key].loaded && !this.state.posts[key].isLoading)
      .sort(this.getPostOrdering);
  }

  handleNavbarFixed(isFixed) {
    if (isFixed) {
      this.setState({ contentClassname: 'content-padded' });
    } else {
      this.setState({ contentClassname: 'content' });
    }
  }

  handleLoadPosts() {
    const numPostsToLoad = config.numPostsToLoad;
    const postsToLoad = this.getPostsToLoad();
    if (postsToLoad.length > 0) {
      postsToLoad.slice(0, numPostsToLoad).forEach((key) => {
        const posts = this.state.posts;
        posts[key].isLoading = true;
        this.setState({ posts });
        this.getPostData(key, this.loadPost);
      });
    }
  }

  loadPage(key, response) {
    this.setState({ pages: App.updateFile(this.state.pages, key, response) });
  }

  loadPost(key, response) {
    this.setState({ posts: App.updateFile(this.state.posts, key, response) });
  }

  render() {
    const loadedPosts = Object.keys(this.state.posts)
      .filter(key => this.state.posts[key].loaded)
      .sort(this.getPostOrdering);
    const pages = Object.keys(this.state.pages)
      .sort((a, b) => this.getPage(a).frontMatter.order < this.getPage(b).frontMatter.order);
    const pageRoutes = pages.map(key => (
      <Route
        key={key}
        path={`/${key}`}
        component={({ match }) => (
          <Page
            page={match.path.substr(1)}
            getPage={this.getPage}
          />
        )}
      />
    ));
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            avatar={avatar}
            avatarAlt={config.header.avatarAlt}
            title={config.header.title}
            description={config.header.description}
            pages={pages}
            getPage={this.getPage}
            onNavbarFixed={this.handleNavbarFixed}
          />
          <div className={this.state.contentClassname}>
            <div className="inner-content container pt-4">
              <Switch>

                <Route
                  path="/"
                  exact
                >
                  <PostScroller
                    hasPostsToLoad={loadedPosts.length < Object.keys(this.state.posts).length}
                    onLoadPosts={this.handleLoadPosts}
                    posts={loadedPosts}
                    getPost={this.getPost}
                  />
                </Route>

                <Route
                  path="/posts/:title"
                  component={({ match }) => {
                    if (match.params.title in this.state.posts) {
                      if (!this.state.posts[match.params.title].body) {
                        this.getPostData(match.params.title, this.loadPost);
                      }
                      return (
                        <Post
                          title={this.state.posts[match.params.title].frontMatter.title}
                          date={this.state.posts[match.params.title].frontMatter.date}
                          body={this.state.posts[match.params.title].body}
                        />);
                    }
                    return <NotFound />;
                  }}
                />

                {pageRoutes}

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
