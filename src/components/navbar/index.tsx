import { ChangeEvent, useState } from "react";

type NavbarProps = {
    onSearch?: (value: string) => void
}

export default function Navbar({ onSearch = () => { } }: NavbarProps) {
    const [search, setSearch] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearch(e.target.value)
    }


    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 flex items-center justify-between gap-2 p-4">
            <div>
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                </a>

            </div>
            <input onChange={handleSearch} value={search} type="text" id="search-navbar" className=" max-w-80 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
        </nav>

    )
}
