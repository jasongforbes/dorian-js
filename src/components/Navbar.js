import React from 'react';
import { NavLink } from 'react-router-dom';

function generateLink(key, path, text) {
  return <li key={`${key}`}><NavLink to={`${path}`} exact>{`${text}`}</NavLink></li>;
}

const Navbar = function render(props) {
  const links = [generateLink('Home', '/', 'Home')]
  .concat(props.pages.map((key) => {
    const page = props.getPage(key);
    return generateLink(key, `/${key}`, page.frontMatter.title);
  }));

  return (
    <div className="nav-container" >
      <ul className="nav">
        {links}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  getPage: React.PropTypes.func.isRequired,
  pages: React.PropTypes.array,
};

Navbar.defaultProps = {
  pages: [],
};


export default Navbar;
