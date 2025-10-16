import { Link, Outlet } from 'react-router';

export const ListUser = () => {
  return (
    <div>
        <Link to="/users/details/1">User 1</Link>
        <Link to="/users/details/2">User 2</Link>
        <Link to="/users/details/3">User 3</Link>
        <Outlet />
    </div>
  )
};
