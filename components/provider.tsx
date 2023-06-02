import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
// import { data } from '../app/api/data';

const Provider: React.FC = () => {
  //   const [search, setSearch] = useState('');

  //   const filteredData = data.filter((item) =>
  //   item.first_name.toLowerCase().includes(search.toLowerCase()) ||
  //   item.id.toString().includes(search.toLowerCase()) ||
  //   item.phone.toLowerCase().includes(search.toLowerCase())
  //   );

  return (
    <div>
      {/* <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {/* filter search and pull data map */}
          {/* {filteredData.map((item) => (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.phone}</td>
              </tr>
            ))} */}
          {/* Add more rows as needed */}
          <tr>
          <td>1</td>
          <td>John Doe</td>
          <td>30</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jane Smith</td>
          <td>25</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Provider;
