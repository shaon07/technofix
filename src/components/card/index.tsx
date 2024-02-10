/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";

type CardProps = {
    data?: any;
}
export default function Card({ data }: CardProps) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={data?.image || "https://robohash.org/Miles.png?set=set4"} alt="" />
            </a>
            <div className="p-5">
                <Link to={`/user/${data.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {`${data.firstName} ${data.lastName}`}
                    </h5>
                </Link>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    Email: {data?.email}</p>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    Address: {`${data.address.address} ${data.address.city} ${data.address.state}`}</p>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    Company Name: {data?.company?.name}</p>

            </div>
        </div>

    )
}
