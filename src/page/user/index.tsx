/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styles } from "../../styles/tailwind/detailPage/index.css";

export default function UserDetail() {
    const { id } = useParams();
    const [data, setData] = useState<any>({});

    useEffect(() => {
        (async () => {
            const data = await axios.get(`https://dummyjson.com/users/${id}`);

            if (data.status === 200) {
                setData(data.data);
            }
        })()
    }, [id]);



    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.headingTab}`}>
                <h1 className="text-base md:text-lg font-bold ">{`${data?.firstName} ${data?.lastName}`}</h1>
                <span className="text-gray-600">{`Age: ${data?.age}`}</span>
            </div>

            <div className="p-4">
                <div className="text-center mb-4">
                    <img className="h-1/2 w-full dark:shadow-gray-800 " src={data?.image} alt="image description" />
                </div>

                <table className={`${styles.tableWrapper}`}>
                    <tbody>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Username:</td>
                            <td className="py-2 px-4">{data?.username}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Email:</td>
                            <td className="py-2 px-4">{data?.email}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Phone:</td>
                            <td className="py-2 px-4">{data?.phone}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Password:</td>
                            <td className="py-2 px-4">{data?.password}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">DOB:</td>
                            <td className="py-2 px-4">{data?.birthDate}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Street:</td>
                            <td className="py-2 px-4">{data?.address?.address}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">City:</td>
                            <td className="py-2 px-4">{data?.address?.city}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">State:</td>
                            <td className="py-2 px-4">{data?.address?.state}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">University:</td>
                            <td className="py-2 px-4">{data?.address?.university}</td>
                        </tr>
                        <tr className={`bg-gray-100 ${styles.row}`}>
                            <td className="py-2 px-4 font-semibold">Company:</td>
                            <td className="py-2 px-4">{data?.company?.name}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
