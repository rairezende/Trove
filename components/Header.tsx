import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListPlus, PlusCircle } from 'lucide-react';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-stone-700 hover:text-secondary transition-colors">
                    <ListPlus className="w-8 h-8 text-primary" />
                    <span>Trovy</span>
                </Link>
                <button
                    onClick={() => navigate('/create')}
                    className="flex items-center gap-2 bg-primary text-white font-body px-4 py-2 rounded-lg hover:bg-secondary transition-colors shadow-sm"
                >
                    <PlusCircle size={20} />
                    <span>New List</span>
                </button>
            </div>
        </header>
    );
};

export default Header;