import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllUsers from './components/AllUsers/AllUsers';
import Navbar from './components/Navbar/Navbar';
import SubscriptionApp from './components/SubscriptionApp/SubscriptionApp';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<SubscriptionApp />} />
        <Route exact path="/subscription" element={<SubscriptionApp />} />
        <Route exact path="/users" element={<AllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
