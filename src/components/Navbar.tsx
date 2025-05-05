
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white py-4 shadow-nav sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">eLearning Hub</Link>
          
          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex align-items-center items-center gap-6">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
                >
                  Courses
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <User size={18} />
                        {user?.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="w-full cursor-pointer">My Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-courses" className="w-full cursor-pointer">My Courses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="btn-primary inline-block"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Courses
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/my-courses" 
                      className={`nav-link ${isActive('/my-courses') ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      My Courses
                    </Link>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-0"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="btn-primary inline-block"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
