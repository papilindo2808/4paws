import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdoptClick = () => {
    if (user) {
      navigate('/add-animal');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Historias', path: '/stories' },
    { name: 'Comunidades', path: '/communities' },
    { name: 'Nosotros', path: '/about-us' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/60 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#f59e0b]">4 PAWS</span>
        </Link>

        {/* Navegación */}
        <nav className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex space-x-12 absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`font-medium text-lg ${
                link.path === '/' ? 'text-[#f59e0b]' : 'text-gray-600 hover:text-[#f59e0b]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Botones de acción */}
        <div className={`${
          isOpen ? 'block' : 'hidden'
        } md:block absolute md:relative top-full right-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            {user && (
              <button
                onClick={handleAdoptClick}
                className="w-full md:w-auto px-6 py-2 rounded-full bg-[#f59e0b] text-white hover:bg-[#e89209] transition-colors duration-200 font-medium"
              >
                ¡AÑADIR ANIMAL!
              </button>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full md:w-auto px-6 py-2 rounded-full border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white transition-colors duration-200 font-medium"
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="w-full md:w-auto">
                  <button className="w-full px-6 py-2 rounded-full border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white transition-colors duration-200 font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="w-full md:w-auto">
                  <button className="w-full px-6 py-2 rounded-full bg-[#f59e0b] text-white hover:bg-[#e89209] transition-colors duration-200 font-medium">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
