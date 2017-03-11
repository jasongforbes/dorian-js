import React from 'react';
import dateformat from 'dateformat';

const PostSummary = function render(props) {
  return (
    <div className="post-summary">
      <h2 className="post-title">{props.title}</h2>
      <span className="post-date">{dateformat(new Date(props.date), 'dd mmm yyyy')}</span>
      <div
        className="post-preview"
        dangerouslySetInnerHTML={{ __html: props.data }} // eslint-disable-line react/no-danger
      />
    </div>
  );
};

PostSummary.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  data: React.PropTypes.string.isRequired,
};

export default PostSummary;
