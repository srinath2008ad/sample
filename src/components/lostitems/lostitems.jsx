import React, { useEffect, useState } from 'react';

const LostItemsTable = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/lost-items')
      .then(res => res.json())
      .then(data => {
        setLostItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading lost items...</p>;
  }

  return (
    <div style={{overflowX: 'auto'}}>
      <h2 style={{marginTop: '2rem'}}>All Lost Item Reports</h2>
      {lostItems.length === 0 ? (
          <>
            <p>No Lost Items</p>
          </>
    ) : (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>ID</th>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>Name</th>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>Email</th>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>Description</th>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>Date Lost</th>
              <th style={{border: '1px solid #ccc', padding: '8px'}}>Image</th>
            </tr>
          </thead>
          <tbody>
            {lostItems.map(item => (
              <tr key={item.id}>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.id}</td>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.name}</td>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.email}</td>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.item_description}</td>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>{item.date_lost}</td>
                <td style={{border: '1px solid #ccc', padding: '8px'}}>
                  {item.image_path ? (
                    <img
                      src={`http://localhost:5000/${item.image_path.replace(/\\/g, "/")}`}
                      alt="Lost item"
                      style={{width: '80px', height: 'auto'}}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LostItemsTable;
