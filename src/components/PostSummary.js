import React from 'react';
import { Link } from 'react-router-dom';
import PostHeader from './PostHeader';

const PostSummary = function render(props) {
  return (
    <div className="post-summary">
      {props.bannerUrl &&
        <div className="banner" style={{ backgroundImage: `url(${props.bannerUrl})` }} >
          <Link to={props.link} />
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
  bannerUrl: React.PropTypes.string,
  description: React.PropTypes.string,
};

PostSummary.defaultProps = {
  description: '',
  bannerUrl: null,
};

export default PostSummary;
