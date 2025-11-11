import { Link } from 'react-router'

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Task Manager</Link>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/home" className="hover:underline">Home</Link>
                            <Link to="/tasks" className="hover:underline">Tasks</Link>
                            <Link to="/profile" className="hover:underline">Profile</Link>
                            <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar