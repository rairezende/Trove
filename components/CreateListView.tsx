
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateListViewProps {
  addList: (title: string, description: string, isPublic: boolean) => void;
}

const CreateListView: React.FC<CreateListViewProps> = ({ addList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addList(title, description, isPublic);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold mb-6">
        <ArrowLeft size={18} />
        Back
      </button>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-stone-700">Create a New List</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-stone-600 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Favorite Movies"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-stone-600 mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="A short description of your list"
            />
          </div>
          <div className="mb-6 flex items-center justify-between bg-slate-50 p-4 rounded-md">
            <div>
              <h3 className="font-semibold text-stone-700">List Visibility</h3>
              <p className="text-sm text-slate-500">{isPublic ? 'Anyone with the link can view.' : 'Only you can see this list.'}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`${isPublic ? 'bg-secondary' : 'bg-slate-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${isPublic ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors shadow-sm disabled:bg-primary"
            disabled={!title.trim()}
          >
            Create List
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListView;
