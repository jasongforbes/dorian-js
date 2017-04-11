import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  static generateLink(key, path, text) {
    return <li key={`${key}`}><NavLink to={`${path}`} exact>{`${text}`}</NavLink></li>;
  }

  constructor() {
    super();
    this.handleViewChange = this.handleViewChange.bind(this);
    this.state = {
      navbarClass: 'navbar',
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
    if (navbarRect.top <= 0 && this.state.navbarClass === 'navbar') {
      this.setState({ navbarClass: 'navbar-sticky' });
      if (this.props.onNavbarFixed) {
        this.props.onNavbarFixed(true);
      }
    } else if (navbarRect.top < headerRect.bottom && this.state.navbarClass === 'navbar-sticky') {
      this.setState({ navbarClass: 'navbar' });
      if (this.props.onNavbarFixed) {
        this.props.onNavbarFixed(false);
      }
    }
  }

  render() {
    const links = [Header.generateLink('Home', '/', 'Home')]
      .concat(this.props.pages.map((key) => {
        const page = this.props.getPage(key);
        return Header.generateLink(key, `/${key}`, page.frontMatter.title);
      }));

    return (
      <div
        className="header"
        ref={(element) => { this.header = element; }}
      >
        <div className="header-content">
          <img className="avatar" src={this.props.avatar} alt={this.props.avatarAlt} />
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <ul
            className={`nav ${this.state.navbarClass}`}
            ref={(element) => { this.navbar = element; }}
          >
            {links}
          </ul>
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
