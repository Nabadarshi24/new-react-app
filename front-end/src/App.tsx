import { RouterProvider } from 'react-router';
import './assets/styles/index.css';
import { route } from './components/routes/index';
import { Loading } from './components/elements/Loading';
import { Suspense } from 'react';

function App() {
  console.log({ timeStamp: new Date().getTime() })

  return (
    // <Suspense fallback={<Loading />}>
    <RouterProvider router={route} />
    // </Suspense>
  )
}

export default App;
