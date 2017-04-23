import React from 'react';

const Page = function render(props) {
  const page = props.getPage(props.page);
  return (
    <div
      className="page content-card"
      dangerouslySetInnerHTML={{ __html: page.body }} // eslint-disable-line react/no-danger
    />
  );
};

Page.propTypes = {
  page: React.PropTypes.string.isRequired,
  getPage: React.PropTypes.func.isRequired,
};

export default Page;
