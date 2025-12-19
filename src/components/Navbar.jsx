import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/home" className="text-xl font-bold">
              Educational Resource Tracker
            </Link>
            {user && (
              <>
                <Link to="/home" className="hover:text-blue-200">
                  Home
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-blue-200">
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm">
                  {user.email}
                  {isAdmin && (
                    <span className="ml-2 px-2 py-1 bg-blue-800 rounded text-xs">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

