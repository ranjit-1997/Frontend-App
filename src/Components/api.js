export const getUsers = async (limit, skip, sortField = "", sortOrder = "asc", filters = {}) => {
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  // Append sorting parameters
  if (sortField) {
    url += `&sort=${sortField}&order=${sortOrder}`;
  }

  // Fetch users
  const response = await fetch(url);
  const data = await response.json();

  // Apply filtering on the client side
  let filteredUsers = data.users;

  Object.keys(filters).forEach(key => {
    filteredUsers = filteredUsers.filter(user =>
      user[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
    );
  });

  return { users: filteredUsers };
};
