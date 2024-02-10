/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

import axios from 'axios';
import { Modal } from 'flowbite-react';
import Card from './components/card';

function App() {
  const [userList, setUserList] = useState<any>([]);

  const [searchUserName, setSearchUserName] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    website: '',
    address: {
      address: '',
      city: '',
      state: '',
    },
    age: '',
    password: '',
    company: {
      name: '',
    }
  });

  useEffect(() => {
    (async () => {
      const data = await axios.get(`https://dummyjson.com/users`);

      if (data.status === 200) {
        setUserList(data.data.users)

      }
    })()
  }, [])





  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await axios.post('https://dummyjson.com/users/add', formData)
    console.log("🚀 ~ handleSubmit ~ data:", data)

    if (data.status === 200) {
      setUserList([...userList, data.data].reverse());
      setOpenModal(false)
    }

  }

  return (
    <div className="text-3xl font-bold underline">
      <div className='mb-2'>
        <Navbar onSearch={(data) => {
          setSearchUserName(data)
        }} />

        <div className="flex items-center gap-2">
          <div className='py-2'>
            <select onChange={(e) => setSortBy(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Sort</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
            </select>
          </div>

          <button onClick={() => setOpenModal(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Add User
          </button>
        </div>

      </div>



      {
        openModal && <div className='fixed top-0 left-0 right-0 bottom-0  bg-black bg-opacity-50 flex justify-center items-center cursor-pointer z-0' >
          <div>
            <Modal className='max-w-[500px] mx-auto' show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Body className='p-3 mx-auto'>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                      <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                      <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div>
                      <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                      <input value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { name: e.target.value } })} type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                      <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required />
                    </div>
                    <div>
                      <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                      <input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                    </div>
                    <div>
                      <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                      <input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                  </div>

                  <div className='flex items-center gap-2'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    <button onClick={() => setOpenModal(false)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Close</button>
                  </div>
                </form>

              </Modal.Body>
            </Modal>
          </div>
        </div>
      }



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          userList?.filter((user: any) => user.username.toLowerCase().includes(searchUserName.toLocaleLowerCase())).sort((a: any, b: any) => {
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
