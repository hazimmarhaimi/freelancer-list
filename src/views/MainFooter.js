import React from 'react';

const MainFooter = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} My Freelancer App By Hazim. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
