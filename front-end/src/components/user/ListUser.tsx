import { ComponentType } from 'react';
import { Link, Outlet } from 'react-router';

const ListUser = () => {
  return (
    <div>
      <Link to="/users/details/1">User 1</Link>
      <Link to="/users/details/2">User 2</Link>
      <Link to="/users/details/3">User 3</Link>
      <Outlet />
    </div>
  )
};

export default ListUser as ComponentType;
