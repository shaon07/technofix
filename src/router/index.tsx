import { Route, Routes } from 'react-router-dom';
import App from '../App';
import UserDetail from '../page/user';


export default function RouteProvider() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
        </div>
    )
}
