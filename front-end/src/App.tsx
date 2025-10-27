import { RouterProvider } from 'react-router';
import './assets/styles/index.css';
import { route } from './components/routes/index';

function App() {
  console.log({timeStamp: new Date().getTime()})


  return (
    <RouterProvider router={route} />
  )
}

export default App;
