import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'

function RootLayout() {
    return (
        <div>
            <Sidebar />
            <Outlet></Outlet>
        </div>
    )
}

export default RootLayout