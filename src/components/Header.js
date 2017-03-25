import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = function render(props) {
  const links = props.pages.map((key) => {
    const page = props.getPage(key);
    return (
      <li key={key}><NavLink to={key}>{page.frontMatter.title}</NavLink></li>
    );
  });
  return (
    <div className="header">
      <img className="avatar" src={props.avatar} alt={props.avatarAlt} />
      <h1><Link to="/">{props.title}</Link></h1>
      <p>{props.description}</p>
      <ul>{links}</ul>
    </div>
  );
};

Header.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  avatarAlt: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  getPage: React.PropTypes.func.isRequired,
  pages: React.PropTypes.array,
};

Header.defaultProps = {
  pages: [],
};

export default Header;
