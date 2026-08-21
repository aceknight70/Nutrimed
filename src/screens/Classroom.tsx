import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';

export const Classroom = () => {
  const { state, addClassroomEntry } = useStore();
  
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isAdmin = state.currentUser?.id === 'admin';

  const sortedEntries = [...state.classroom].sort((a, b) => a.order - b.order);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addClassroomEntry({
      title,
      content,
      order: state.classroom.length + 1
    });
    setTitle('');
    setContent('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="mb-10 flex justify-between items-end border-b border-nutri-navy/10 pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-nutri-navy">Classroom</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-gold mt-2">Training & Protocols</p>
        </div>
        {isAdmin && !showAdd && (
          <button 
            onClick={() => setShowAdd(true)}
            className="bg-nutri-navy text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 hover:bg-nutri-gold hover:text-nutri-navy transition-colors shadow-sm"
          >
            + Add Entry
          </button>
        )}
      </div>

      <div className="space-y-8 pb-10">
        {sortedEntries.map((entry, idx) => (
          <div key={entry.id} className="bg-white border-l-8 border-nutri-navy p-6 md:p-8 shadow-sm">
            <div className="text-[10px] font-black text-nutri-gold uppercase tracking-widest mb-2">Entry {String(idx + 1).padStart(2, '0')}</div>
            <h2 className="text-2xl font-black text-nutri-navy mb-5 tracking-tight uppercase leading-none">{entry.title}</h2>
            <div className="text-sm font-medium text-nutri-navy/90 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </div>
          </div>
        ))}
        {sortedEntries.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-nutri-navy/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-navy/60">No classroom entries yet.</p>
          </div>
        )}
      </div>

      {isAdmin && showAdd && (
        <div className="mt-4 border-t-2 border-nutri-navy/10 pt-8 pb-12">
          <form onSubmit={handleSubmit} className="bg-white border border-nutri-navy/20 p-8 shadow-sm">
            <h3 className="font-black text-nutri-navy uppercase tracking-widest text-sm mb-6 pb-2 border-b border-nutri-navy/10">New Entry</h3>
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-[10px] font-black text-nutri-navy uppercase tracking-widest mb-3">Title</label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-nutri-cream border border-nutri-navy/20 px-4 py-3 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy rounded-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-nutri-navy uppercase tracking-widest mb-3">Content</label>
                <textarea 
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={5}
                  className="w-full bg-nutri-cream border border-nutri-navy/20 px-4 py-3 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy rounded-none resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-nutri-navy text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 shadow-sm hover:opacity-90">Save</button>
              <button type="button" onClick={() => setShowAdd(false)} className="border border-nutri-navy/20 text-nutri-navy text-[10px] font-black uppercase tracking-widest px-8 py-3 hover:bg-nutri-cream">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
