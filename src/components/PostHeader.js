import React from 'react';
import { Link } from 'react-router-dom';
import dateformat from 'dateformat';

const PostHeader = function render(props) {
  const header = props.link ?
    <Link to={`/posts/${props.link}`}>{props.title}</Link> :
    props.title;
  return (
    <div className="post-headers container">
      <h2 className="title row mb-0">{header}</h2>
      <span className="date row mb-1">{dateformat(new Date(props.date), 'dd mmm yyyy')}</span>
    </div>
  );
};

PostHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  link: React.PropTypes.string,
};

PostHeader.defaultProps = {
  link: null,
};

export default PostHeader;
