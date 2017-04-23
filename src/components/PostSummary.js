import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from './BackgroundImage';
import PostHeader from './PostHeader';

const PostSummary = function render(props) {
  return (
    <div className="post-summary content-card">
      {props.banner &&
        <div className="banner">
          <BackgroundImage
            url={props.banner}
          >
            <Link to={props.link} />
          </BackgroundImage>
        </div>
      }
      <div className="summary-text">
        <Link to={props.link}>
          <PostHeader
            title={props.title}
            date={props.date}
          />
          <p>{props.description}</p>
        </Link>
      </div>
    </div>
  );
};

PostSummary.propTypes = {
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  banner: React.PropTypes.string,
  description: React.PropTypes.string,
};

PostSummary.defaultProps = {
  description: '',
  banner: null,
};

export default PostSummary;
