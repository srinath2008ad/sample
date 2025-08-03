// import React, { useEffect, useState } from 'react';

// const LostItemsTable = () => {
//   const [lostItems, setLostItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/lost-items')
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         if (Array.isArray(data)) {
//           setLostItems(data);
//           setError(null);
//         } else if (data.error) {
//           setError(data.error);
//           setLostItems([]);
//         } else {
//           setError('Unexpected response format from server.');
//           setLostItems([]);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch error:', err);
//         setError('Failed to load lost items.');
//         setLostItems([]);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading lost items...</p>;
//   }

//   if (error) {
//     return <p style={{ color: 'red' }}>Error: {error}</p>;
//   }

//   if (!Array.isArray(lostItems) || lostItems.length === 0) {
//     return <p>No lost item reports found.</p>;
//   }

//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <h2>All Lost Item Reports</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>ID</th>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>Name</th>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>Email</th>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>Description</th>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>Date Lost</th>
//             <th style={{ border: '1px solid #ccc', padding: 8 }}>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lostItems.map(item => (
//             <tr key={item.id}>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.id}</td>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.name}</td>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.email}</td>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.item_description}</td>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.date_lost}</td>
//               <td style={{ border: '1px solid #ccc', padding: 8 }}>
//                 {item.image_path ? (
//                   <img
//                     src={`http://localhost:5000/${item.image_path.replace(/\\/g, '/')}`}
//                     alt="Lost item"
//                     style={{ width: 80, height: 'auto' }}
//                   />
//                 ) : (
//                   <span>No Image</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LostItemsTable;


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