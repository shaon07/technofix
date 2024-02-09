/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import './App.css';
import Card from './components/card';
import useApi from './services/api';

function App() {
  const { data, error, loading, request } = useApi();

  useEffect(() => {
    request({
      url: 'users',
      method: 'GET',
    })
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }


  if (error) {
    return <h1>
      {JSON.stringify(error)}
    </h1>
  }

  return (
    <div className="text-3xl font-bold underline">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          data?.users.map((user: any, index: number) => {
            return (
              <Card data={user} key={index} />
            )
          })
        }
      </div>

    </div>
  )
}

export default App
