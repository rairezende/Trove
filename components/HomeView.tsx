
import React from 'react';
import { Link } from 'react-router-dom';
import { List as ListType } from '../types';
import ListCard from './ListCard';
import { PlusCircle } from 'lucide-react';

interface HomeViewProps {
  lists: ListType[];
}

const HomeView: React.FC<HomeViewProps> = ({ lists }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-stone-700">Your Lists</h1>
      {lists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(list => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-stone-300">
          <h2 className="text-2xl font-semibold text-stone-700 mb-2">No lists yet!</h2>
          <p className="text-stone-500 mb-6">Let's create your first one.</p>
          <Link to="/create" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-transform hover:scale-105 shadow-sm">
             <PlusCircle size={20} />
            <span>Create a New List</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeView;
