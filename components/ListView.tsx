
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ListItem } from '../types';
import { Plus, Trash2, Edit, Save, X, Share2, Clipboard, Check, Lock, Globe, ArrowLeft, MoreVertical } from 'lucide-react';

interface ListViewProps {
  lists: List[];
  updateList: (list: List) => void;
  deleteList: (listId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ lists, updateList, deleteList }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newItemText, setNewItemText] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemText, setEditingItemText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const list = useMemo(() => lists.find(l => l.id === id), [lists, id]);

  useEffect(() => {
    if (!list) {
      navigate('/');
    }
  }, [list, navigate]);

  if (!list) {
    return null;
  }
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      const newItem: ListItem = {
        id: crypto.randomUUID(),
        text: newItemText.trim(),
        completed: false,
      };
      updateList({ ...list, items: [...list.items, newItem] });
      setNewItemText('');
    }
  };

  const handleToggleItem = (itemId: string) => {
    const updatedItems = list.items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    updateList({ ...list, items: updatedItems });
  };
  
  const handleEditItem = (item: ListItem) => {
      setEditingItemId(item.id);
      setEditingItemText(item.text);
  };
  
  const handleSaveItem = (itemId: string) => {
    const updatedItems = list.items.map(item =>
        item.id === itemId ? { ...item, text: editingItemText } : item
    );
    updateList({...list, items: updatedItems});
    setEditingItemId(null);
    setEditingItemText('');
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = list.items.filter(item => item.id !== itemId);
    updateList({ ...list, items: updatedItems });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteList = () => {
    deleteList(list.id);
  };
  
  const completedCount = list.items.filter(item => item.completed).length;
  const totalCount = list.items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold mb-4">
        <ArrowLeft size={18} />
        All Lists
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-700">{list.title}</h1>
            <p className="text-stone-500 mt-1">{list.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {list.isPublic ? (
                <button onClick={() => setShowShareModal(true)} className="p-2 rounded-full hover:bg-slate-100 text-stone-600 transition-colors">
                    <Share2 size={20} />
                </button>
            ) : <div className="p-2 rounded-full bg-slate-100 text-stone-600" title="This list is private"><Lock size={20}/></div>}
             <div className="relative">
                <button onClick={() => setShowDeleteConfirm(!showDeleteConfirm)} className="p-2 rounded-full hover:bg-slate-100 text-stone-600 transition-colors">
                    <MoreVertical size={20} />
                </button>
                {showDeleteConfirm && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                        <button 
                            onClick={handleDeleteList}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={16}/> Delete List
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="my-6">
              <div className="flex justify-between text-sm font-medium text-stone-500 mb-1">
                  <span>Progress</span>
                  <span>{completedCount} / {totalCount}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
          </div>
        )}

        {/* Add item form */}
        <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a new item..."
            className="flex-grow px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="bg-primary text-white p-2 rounded-md hover:bg-secondary transition-colors flex-shrink-0" disabled={!newItemText.trim()}>
            <Plus size={24} />
          </button>
        </form>

        {/* Items list */}
        <ul className="space-y-3">
          {list.items.map(item => (
            <li key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-md group">
              <input type="checkbox" checked={item.completed} onChange={() => handleToggleItem(item.id)} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"/>
              
              {editingItemId === item.id ? (
                 <input
                    type="text"
                    value={editingItemText}
                    onChange={(e) => setEditingItemText(e.target.value)}
                    className="flex-grow bg-transparent focus:outline-none"
                    autoFocus
                 />
              ) : (
                 <span className={`flex-grow ${item.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>{item.text}</span>
              )}

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingItemId === item.id ? (
                    <>
                        <button onClick={() => handleSaveItem(item.id)} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><Save size={18}/></button>
                        <button onClick={() => setEditingItemId(null)} className="p-2 text-stone-500 hover:bg-slate-200 rounded-full"><X size={18}/></button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleEditItem(item)} className="p-2 text-stone-500 hover:bg-slate-200 rounded-full"><Edit size={18}/></button>
                        <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Trash2 size={18}/></button>
                    </>
                )}
              </div>
            </li>
          ))}
           {list.items.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-stone-500">This list is empty. Add your first item above!</p>
                </div>
            )}
        </ul>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" onClick={() => setShowShareModal(false)}>
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share this list</h2>
              <button onClick={() => setShowShareModal(false)} className="p-1 rounded-full hover:bg-slate-200"><X size={20} /></button>
            </div>
            <p className="text-stone-600 mb-4">Anyone with this link can view this list.</p>
            <div className="flex gap-2">
              <input type="text" value={window.location.href} readOnly className="flex-grow px-3 py-2 bg-slate-100 border border-stone-300 rounded-md"/>
              <button onClick={handleCopyLink} className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white transition-colors ${copied ? 'bg-green-500' : 'bg-primary hover:bg-secondary'}`}>
                {copied ? <Check size={20} /> : <Clipboard size={20} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;
