import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscriptionApp() {
  const [initTeamLoading, setInitTeamLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (subId, userId, action) => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}user/subAction`, { subId, userId, action })
      .then((res) => {
        setSubscriptions((prev) => prev.filter((s) => s._id !== subId));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}user/getSubscription`).then((res) => {
      setSubscriptions(res.data);
      setInitTeamLoading(false);
    });
  }, []);

  return (
    <div className='Container'>
      <h1 className='display-3 text-center py-3'> Subscriptions Request</h1>
      <div className='mx-5'>
        {initTeamLoading ? (
          <h1 className=' text-center py-3' style={{ fontWeight: 'lighter' }}>
            Loading...
          </h1>
        ) : (
          <table className='table table-striped'>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Name</th>
                <th>Email</th>
                <th>Bkash No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr style={{ textAlign: 'center' }}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.bkashNo}</td>
                  <td>
                    <button
                      className='btn btn-success'
                      style={{ marginRight: 6 }}
                      onClick={() => handleClick(s._id, s.userId, 'pos')}
                      disabled={isLoading}
                    >
                      Approve
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleClick(s._id, s.userId, 'neg')}
                      disabled={isLoading}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SubscriptionApp;