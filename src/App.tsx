/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

import axios from 'axios';
import Card from './components/card';
import ModalContainer from './components/modal';
import SelectBox from './components/selectBox';
import { globalStyles } from './styles/tailwind/global.css';

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
        setUserList(data.data.users);
      }
    })()
  }, [])

  const sortByData = (a: any, b: any) => {
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
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await axios.post('https://dummyjson.com/users/add', formData)

    if (data.status === 200) {
      setUserList([...userList, data.data].reverse());
      setOpenModal(false);
      setFormData({
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
      })
    }

  }

  return (
    <div className="text-3xl font-bold underline">
      <div className='mb-2'>
        <Navbar onSearch={(data) => {
          setSearchUserName(data)
        }} />

        <div className="flex items-center gap-2">
          <SelectBox onSort={(data) => setSortBy(data)} />

          <button onClick={() => setOpenModal(true)} className={`${globalStyles.buttonBlue}`} type="button">
            Add User
          </button>
        </div>
      </div>

      {
        openModal && <ModalContainer openModal={openModal} onClose={() => setOpenModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>

                <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" id="first_name" className={`${globalStyles.input}`} placeholder="John" required />
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>

                <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" id="last_name" className={`${globalStyles.input}`} placeholder="Doe" required />
              </div>

              <div>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>

                <input value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { name: e.target.value } })} type="text" id="company" className={`${globalStyles.input}`} placeholder="Flowbite" required />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>

                <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" id="phone" className={`${globalStyles.input}`} placeholder="123-45-678" required />
              </div>

              <div>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>

                <input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} type="url" id="website" className={`${globalStyles.input}`} placeholder="flowbite.com" required />
              </div>

              <div>
                <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                <input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} type="number" id="visitors" className={`${globalStyles.input}`} placeholder="" required />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" className={`${globalStyles.input}`} placeholder="john.doe@company.com" required />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" id="password" className={`${globalStyles.input}`} placeholder="•••••••••" required />
            </div>

            <div className='flex items-center gap-2'>
              <button type="submit" className={`${globalStyles.buttonBlue}`}>Submit</button>
              <button onClick={() => setOpenModal(false)} type="button" className={`${globalStyles.buttonRed}`}>Close</button>
            </div>
          </form>
        </ModalContainer>
      }



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          userList?.filter((user: any) => user.username.toLowerCase().includes(searchUserName.toLocaleLowerCase())).sort((a: any, b: any) => {
            return sortByData(a, b)
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
