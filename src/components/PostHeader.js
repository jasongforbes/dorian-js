import React from 'react';
import dateformat from 'dateformat';

const PostHeader = function render(props) {
  const header = props.title;
  return (
    <div className="post-headers">
      <h2 className="post-title">{header}</h2>
      <span className="post-date">{dateformat(new Date(props.date), 'dd mmm yyyy')}</span>
    </div>
  );
};

PostHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
};


export default PostHeader;
