
import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { List } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import HomeView from './components/HomeView';
import ListView from './components/ListView';
import CreateListView from './components/CreateListView';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [lists, setLists] = useLocalStorage<List[]>('lists', []);
  const navigate = useNavigate();

  const addList = (title: string, description: string, isPublic: boolean) => {
    const newList: List = {
      id: crypto.randomUUID(),
      title,
      description,
      isPublic,
      items: [],
      createdAt: new Date().toISOString(),
    };
    setLists(prevLists => [...prevLists, newList]);
    navigate(`/list/${newList.id}`);
  };

  const updateList = useCallback((updatedList: List) => {
    setLists(prevLists => prevLists.map(list => list.id === updatedList.id ? updatedList : list));
  }, [setLists]);

  const deleteList = (listId: string) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomeView lists={lists} />} />
          <Route path="/create" element={<CreateListView addList={addList} />} />
          <Route 
            path="/list/:id" 
            element={
              <ListView 
                lists={lists} 
                updateList={updateList}
                deleteList={deleteList}
              />
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;