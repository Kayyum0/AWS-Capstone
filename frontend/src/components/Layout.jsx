import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = React.useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const doctorUser = localStorage.getItem('doctorUser');
        const patientUser = localStorage.getItem('user');

        if (doctorUser) {
            setUser({ ...JSON.parse(doctorUser), role: 'doctor' });
        } else if (patientUser) {
            setUser({ ...JSON.parse(patientUser), role: 'patient' });
        } else {
            setUser(null);
        }
    }, [location]);

    // Handle click outside to close profile dropdown
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('doctorUser');
        localStorage.removeItem('user');
        setUser(null);
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-slate-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <HeartPulse className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                                HealthPortal
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {/* Guest Navigation */}
                        {!user && (
                            <>
                                <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                                <Link to="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About</Link>
                                <Link to="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                            </>
                        )}

                        {/* Patient Navigation */}
                        {user && user.role === 'patient' && (
                            <>
                                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
                                <Link to="/book-appointment" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Book Appointment</Link>
                                <Link to="/patient/history" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Medical History</Link>
                            </>
                        )}

                        {/* Doctor Navigation */}
                        {user && user.role === 'doctor' && (
                            <Link to="/doctor/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
                        )}

                        <div className="flex items-center gap-4 ml-4">
                            {user ? (
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 text-slate-700 font-medium hover:text-blue-600 transition-colors focus:outline-none"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <User size={18} />
                                        </div>
                                        <span>Hello, {user.role === 'doctor' ? `Dr. ${user.name}` : user.name}</span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-100 z-50">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-red-600 flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600 px-3 py-2">
                                        User Login
                                    </Link>
                                    <Link to="/doctor/login" className="text-slate-600 font-medium hover:text-blue-600 px-3 py-2 border-l border-slate-200 pl-4">
                                        Doctor Login
                                    </Link>
                                    <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                                        <User size={18} />
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-white border-b border-slate-100 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {!user && (
                            <>
                                <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Home</Link>
                                <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">About</Link>
                                <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Services</Link>
                            </>
                        )}

                        {user && user.role === 'patient' && (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Dashboard</Link>
                                <Link to="/book-appointment" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Book Appointment</Link>
                                <Link to="/patient/history" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Medical History</Link>
                            </>
                        )}
                        {user && user.role === 'doctor' && (
                            <Link to="/doctor/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Dashboard</Link>
                        )}

                        <div className="border-t border-slate-100 pt-3 mt-3">
                            {user ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-slate-500">
                                        Signed in as <span className="font-medium text-slate-900">{user.role === 'doctor' ? `Dr. ${user.name}` : user.name}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-slate-600 font-medium hover:text-red-600 hover:bg-slate-50 flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block w-full text-center px-4 py-2 text-slate-600 font-medium">User Login</Link>
                                    <Link to="/doctor/login" className="block w-full text-center px-4 py-2 text-slate-600 font-medium border-t border-slate-50 mt-1">Doctor Login</Link>
                                    <Link to="/register" className="block w-full text-center mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium mx-auto max-w-xs">Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <HeartPulse className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">HealthPortal</span>
                    </div>
                    <p className="text-slate-400 max-w-sm">
                        Revolutionizing healthcare accessibility with secure, cloud-native solutions. Connect with top doctors and manage your health journey effortlessly.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition-colors">Find Doctors</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Book Appointment</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Practitioner Login</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} HealthPortal Inc. All rights reserved.
            </div>
        </div>
    </footer>
);

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
