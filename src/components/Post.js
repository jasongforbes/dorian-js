import React from 'react';
import BackgroundImage from './BackgroundImage';
import PostHeader from './PostHeader';

const Post = function render(props) {
  return (
    <div className="post content-card">
      <PostHeader
        title={props.title}
        date={props.date}
      />
      {props.banner &&
        <div className="banner">
          <BackgroundImage
            className="banner"
            url={props.banner}
          />
        </div>
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
  banner: React.PropTypes.string,
  body: React.PropTypes.string,
};

Post.defaultProps = {
  body: '',
  banner: null,
};

export default Post;
