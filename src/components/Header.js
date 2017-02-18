import React from 'react';

const Header = function render(props) {
  return (
    <div className="header">
      <img className="avatar" src={props.avatar} alt={props.avatarAlt} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

Header.propTypes = {
  avatar: React.PropTypes.string.isRequired,
  avatarAlt: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};

export default Header;
