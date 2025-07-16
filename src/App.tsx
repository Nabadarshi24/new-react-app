import { RouterProvider } from 'react-router';
import './App.css';
import { useAccountStore } from './components/stores/GlobalStore';
import { route } from './components/routes/index';

function App() {

  return (
    <RouterProvider router={route} />
  )
}

export default App;
