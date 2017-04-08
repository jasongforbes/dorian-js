import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  static renderPage(key, pageTitle) {
    return (
      <div className="col-md-auto" key={key}>
        <NavLink
          to={`/${key}`}
          exact
        >
          {pageTitle}
        </NavLink>
      </div>
    );
  }

  constructor() {
    super();
    this.handleViewChange = this.handleViewChange.bind(this);
    this.state = {
      navbarClass: 'dorian-navbar',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleViewChange);
    window.addEventListener('resize', this.handleViewChange);
    this.handleViewChange();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleViewChange);
    window.removeEventListener('resize', this.handleViewChange);
  }

  handleViewChange() {
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    if (navbarRect.top <= 0 && this.state.navbarClass === 'dorian-navbar') {
      this.setState({ navbarClass: 'dorian-navbar-sticky' });
      if (this.props.onNavbarFixed) {
        this.props.onNavbarFixed(true);
      }
    } else if (navbarRect.top < headerRect.bottom && this.state.navbarClass === 'dorian-navbar-sticky') {
      this.setState({ navbarClass: 'dorian-navbar' });
      if (this.props.onNavbarFixed) {
        this.props.onNavbarFixed(false);
      }
    }
  }

  render() {
    const links = [Header.renderPage('', 'Home')]
      .concat(this.props.pages.map(key =>
        Header.renderPage(key, this.props.getPage(key).frontMatter.title)));
    return (
      <div
        className="header container-fluid"
        ref={(element) => { this.header = element; }}
      >
        <div className="row" >
          <div className="col">
            <img
              className="rounded-circle avatar"
              src={this.props.avatar}
              alt={this.props.avatarAlt}
            />
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
            <div
              className={`container ${this.state.navbarClass} dorian-nav p-0 m-0`}
              ref={(element) => { this.navbar = element; }}
            >
              <div className="row no-gutters">
                {links}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  avatarAlt: React.PropTypes.string.isRequired,
  onNavbarFixed: React.PropTypes.func,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  getPage: React.PropTypes.func.isRequired,
  pages: React.PropTypes.array,
};

Header.defaultProps = {
  onNavbarFixed: null,
  pages: [],
};

export default Header;
