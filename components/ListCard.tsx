
import React from 'react';
import { Link } from 'react-router-dom';
import { List as ListType } from '../types';
import { Lock, Globe, ListChecks, Calendar } from 'lucide-react';

interface ListCardProps {
  list: ListType;
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  return (
    <Link to={`/list/${list.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-stone-700 group-hover:text-primary transition-colors mb-2">{list.title}</h2>
        {list.isPublic ? (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
            <Globe size={14} />
            <span>Public</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-stone-600 bg-slate-100 px-2 py-1 rounded-full">
            <Lock size={14} />
            <span>Private</span>
          </div>
        )}
      </div>
      <p className="text-stone-500 mb-4 h-12 overflow-hidden text-ellipsis">{list.description}</p>
      <div className="flex justify-between items-center text-sm text-stone-500 pt-4 border-t border-slate-100">
         <div className="flex items-center gap-2">
            <ListChecks size={16} />
            <span>{list.items.length} items</span>
         </div>
         <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(list.createdAt).toLocaleDateString()}</span>
         </div>
      </div>
    </Link>
  );
};

export default ListCard;
