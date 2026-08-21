import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';

export const PeopleRoster = () => {
  const { state, addPerson } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', needs: '' });

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentUser) {
      alert("You must be logged in to add a person.");
      return;
    }
    if (newPerson.name && newPerson.needs) {
      addPerson(newPerson);
      setNewPerson({ name: '', needs: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-nutri-navy">The People</h2>
          <p className="text-nutri-navy/60 font-bold uppercase tracking-widest text-[10px] mt-1">Connecting individuals with their nutritional needs.</p>
        </div>
        
        {state.currentUser && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-nutri-gold text-nutri-navy px-4 py-2 font-black text-[11px] uppercase tracking-widest hover:bg-nutri-navy hover:text-white transition-colors shadow-sm"
          >
            {showForm ? 'Cancel' : '+ Request Support'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAddPerson} className="bg-white p-6 border border-nutri-navy/10 shadow-sm mb-8">
          <h3 className="text-sm font-black uppercase tracking-widest text-nutri-navy mb-4 border-b border-nutri-navy/10 pb-2">Add a Person in Need</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">Person's Name</label>
              <input 
                type="text" 
                value={newPerson.name}
                onChange={e => setNewPerson({ ...newPerson, name: e.target.value })}
                className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:outline-none focus:border-nutri-gold"
                placeholder="e.g. Grace Ofori"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">What do they need?</label>
              <textarea 
                value={newPerson.needs}
                onChange={e => setNewPerson({ ...newPerson, needs: e.target.value })}
                className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:outline-none focus:border-nutri-gold min-h-[80px]"
                placeholder="What food, how often, any conditions to know about..."
                required
              />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-nutri-navy text-white px-6 py-2 font-black text-[11px] uppercase tracking-widest hover:bg-nutri-gold transition-colors">
                Save & Assign Me as Guardian
              </button>
            </div>
          </div>
        </form>
      )}

      {state.people.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-nutri-navy/20 bg-white p-12 text-center">
          <p className="text-nutri-navy/60 font-bold uppercase tracking-widest text-sm">No people added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {state.people.map(person => {
            const guardianLink = state.guardians.find(g => g.person_id === person.id);
            const guardian = guardianLink ? state.members.find(m => m.id === guardianLink.member_id) : null;
            return (
              <div key={person.id} className="bg-white border border-nutri-navy/10 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-nutri-navy">{person.name}</h3>
                  {guardianLink && (
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 \${guardianLink.status === 'Active' ? 'bg-nutri-green/20 text-nutri-green' : 'bg-nutri-gold text-nutri-navy'}`}>
                      {guardianLink.status}
                    </span>
                  )}
                </div>
                <div className="flex-1 mb-4">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-nutri-navy/50 mb-1">Needs</h4>
                  <p className="text-sm font-medium text-nutri-navy leading-relaxed">{person.needs}</p>
                </div>
                {guardian && (
                  <div className="mt-auto pt-4 border-t border-nutri-navy/10 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-nutri-navy text-white flex items-center justify-center text-[10px] font-black shrink-0 mr-3">
                      {guardian.name[0]}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-nutri-navy/50 leading-none">Guardian</p>
                      <p className="text-xs font-black uppercase tracking-tight text-nutri-navy">{guardian.name}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
