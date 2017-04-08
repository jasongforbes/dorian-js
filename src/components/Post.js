import React from 'react';
import PostHeader from './PostHeader';

const Post = function render(props) {
  return (
    <div className="post container-fluid">
      <PostHeader
        title={props.title}
        date={props.date}
      />
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: props.body }} // eslint-disable-line react/no-danger
      />
    </div>
  );
};

Post.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  body: React.PropTypes.string,
};

Post.defaultProps = {
  body: '',
};

export default Post;
