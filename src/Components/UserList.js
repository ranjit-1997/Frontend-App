import React, { useState, useEffect, useCallback } from "react";
import Filtering from "./Filtering";
import Sorting from "./Sorting";
import UserItem from "./UserItem";
import { getUsers } from "./api";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [hasMore, setHasMore] = useState(true); // To control whether more data is available

  const fetchUsers = useCallback(async () => {
    let data = await getUsers(limit, skip, sortField, sortOrder, filters);

    if (data.users.length < limit) {
      setHasMore(false); // No more data to load
    }

    if (skip === 0) {
      setUsers(data.users);
    } else {
      setUsers((prevUsers) => [...prevUsers, ...data.users]);
    }
    
    console.log("Fetched and processed Users: ", data.users); // Debug log for fetched users
  }, [limit, skip, sortField, sortOrder, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleFilter = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setSkip(0); 
    setHasMore(true); // Reset 'hasMore' for new filtering
    fetchUsers(); // Fetch filtered data
  };

  const handleSort = (field) => {
    if (["address.state", "company.title"].includes(field)) {
      return; // Skip sorting for location and designation
    }
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setSkip(0); // Reset pagination
    setHasMore(true); // Reset 'hasMore' for new sorting
    fetchUsers(); // Fetch sorted data
  };

  return (
    <div className="container">
      <header>
        <h1 className="header-title">Employee</h1>
        <div className="filters">
          <Filtering onFilter={handleFilter} />
          <Sorting onSort={handleSort} />
        </div>
      </header>
      <InfiniteScroll
        dataLength={users.length}
        next={() => setSkip((prevSkip) => prevSkip + limit)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more users to load.</p>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Demography</th>
              <th>Designation</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
