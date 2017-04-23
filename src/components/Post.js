import React from 'react';
import PostHeader from './PostHeader';

const Post = function render(props) {
  return (
    <div className="post content-card">
      <PostHeader
        title={props.title}
        date={props.date}
      />
      {props.bannerUrl &&
        <div className="banner" style={{ backgroundImage: `url(../${props.bannerUrl})` }} />
      }     
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
  bannerUrl: React.PropTypes.string,
  body: React.PropTypes.string,
};

Post.defaultProps = {
  body: '',
  bannerUrl: null,
};

export default Post;
