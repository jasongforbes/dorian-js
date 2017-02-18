import React from 'react';
import Header from './components/Header';
import avatar from '../images/avatar.svg';

const App = function render() {
  return (
    <div className="app">
      <Header
        avatar={avatar}
        avatarAlt="Default Image"
        title="My Landing Page"
        description="This is the landing page description."
      />
    </div>
  );
};

export default App;
