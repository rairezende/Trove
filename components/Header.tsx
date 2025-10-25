import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListPlus, PlusCircle } from 'lucide-react';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                    <ListPlus className="w-8 h-8 text-indigo-500" />
                    <span>Trovy</span>
                </Link>
                <button
                    onClick={() => navigate('/create')}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <PlusCircle size={20} />
                    <span>New List</span>
                </button>
            </div>
        </header>
    );
};

export default Header;