import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Table.css';



function AllUsers() {
  const [initTeamLoading, setInitTeamLoading] = useState(true);
  const [users, setUers] = useState([]);


  useEffect(() => {
    console.log()
    axios.get(`${process.env.REACT_APP_API_URL}user/all`).then((res) => {
      setUers(res.data.users);
      setInitTeamLoading(false);
    });
  }, []);

  return (
    <div className='Container'>
      <h1 className='display-3 text-center py-3'> Users ({users.length})</h1>
      <div className='mx-5'>
        {initTeamLoading ? (
          <h1 className=' text-center py-3' style={{ fontWeight: 'lighter' }}>
            Loading...
          </h1>
        ) : (
          <>
            <table className='table table-striped'>
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Expiration Date</th>

                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr style={{ textAlign: 'center', cursor: 'pointer' }} key={u._id} >
                    <td>{u?.name ? u.name : null} </td>
                    <td>{u?.email ? u.email : null}</td>
                    <td>{(moment(u.subExpirationDate).isAfter(new Date())) === true ? 'Premium' : 'Free'}</td>
                    <td>{moment(u.expirationDate).format('DD/MM/YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default AllUsers;