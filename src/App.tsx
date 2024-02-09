/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';
import Navbar from './components/navbar';
import useApi from './services/api';

function App() {
  const { data, error, loading, request } = useApi();
  const [searchUserName, setSearchUserName] = useState('');
  const [sortBy, setSortBy] = useState('');

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
      <div className='mb-2'>
        <Navbar onSearch={(data) => {
          setSearchUserName(data)
        }} />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select onChange={(e) => setSortBy(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a country</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="company">Company</option>
        </select>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          data?.users.filter((user: any) => user.username.toLowerCase().includes(searchUserName.toLocaleLowerCase())).sort((a: any, b: any) => {
            if (sortBy === 'name') {
              const nameA = a.firstName.toLowerCase();
              const nameB = b.firstName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
            } else if (sortBy === 'email') {
              const emailA = a.email.toLowerCase();
              const emailB = b.email.toLowerCase();
              if (emailA < emailB) {
                return -1;
              }
            } else if (sortBy === 'company') {
              const companyA = a.company.name.toLowerCase();
              const companyB = b.company.name.toLowerCase();
              if (companyA < companyB) {
                return -1;
              }
            }
          }).map((user: any, index: number) => {
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
