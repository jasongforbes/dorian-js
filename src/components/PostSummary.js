import React from 'react';
import PostHeader from './PostHeader';

const PostSummary = function render(props) {
  return (
    <div className="post-summary">
      <PostHeader
        link={props.link}
        title={props.title}
        date={props.date}
      />
      <div
        className="post-preview"
        dangerouslySetInnerHTML={{ __html: props.body }} // eslint-disable-line react/no-danger
      />
    </div>
  );
};

PostSummary.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};

export default PostSummary;
