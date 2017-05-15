import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const BackgroundImage = function render(props) {
  return (
    <CSSTransitionGroup
      component="div"
      className="sharpen-transition-group"
      transitionName="sharpen"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      <div
        className="background-image"
        key={props.url}
        style={{ backgroundImage: `url(/${props.url})` }}
      >
        {props.children}
      </div>
    </CSSTransitionGroup>
  );
};


BackgroundImage.propTypes = {
  url: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

BackgroundImage.defaultProps = {
  children: null,
};

export default BackgroundImage;
