import React from 'react';
import dateformat from 'dateformat';

const PostHeader = function render(props) {
  return (
    <div className="post-header">
      <h2 className="post-title">{props.title}</h2>
      <span className="post-date">{dateformat(new Date(props.date), 'dd mmm yyyy')}</span>
    </div>
  );
};

PostHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
};


export default PostHeader;
