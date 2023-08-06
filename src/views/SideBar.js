import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sideBarItems = [
    {
      title: 'Freelancer List',
      path: '/freelancerlist',
      icon: <i className="fa fa-users" />,
    },
    // Add more items here if needed
  ];

  return (
    <div className="sidebar-container">
      <ul className="nav-list">
        {sideBarItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink to={item.path} activeClassName="active" className="nav-link">
              <div className='nav-link-icon'>
                {item.icon}
              </div>
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
