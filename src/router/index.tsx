import { Route, Routes } from 'react-router-dom';
import App from '../App';


export default function RouteProvider() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<div>About</div>} />
            </Routes>
        </div>
    )
}
