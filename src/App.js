import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FreelancerList from './pages/FreelancerList';
import MainHeader from './views/MainHeader';
import Sidebar from './views/SideBar';
import MainFooter from './views/MainFooter';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MainHeader />
        <div style={{ flex: '1', padding: '20px' }}>
          {/* <Sidebar /> */}
          <Routes>
            <Route path='/freelancerlist' element={<FreelancerList />} />
            {/* Add other routes here */}
          </Routes>
        </div>
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;

