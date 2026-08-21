import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

export const YouthRoster = () => {
  const { state } = useStore();

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="bg-nutri-navy text-white p-8 mb-8 border border-nutri-navy/10 shadow-sm flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">YouthTeam Connect</h1>
        <p className="text-nutri-gold font-bold text-xs md:text-sm uppercase tracking-widest">
          ({state.members.length}+ young people building the directory)
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {state.members.map(member => {
          const booklet = state.booklets.find(b => b.member_id === member.id);
          const vendorCount = state.engagements.filter(e => e.member_id === member.id).length;

          return (
            <div key={member.id} className="bg-white border border-nutri-navy/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-0">
                <div className="w-16 h-16 rounded-full bg-nutri-gold flex flex-col items-center justify-center text-nutri-navy font-black text-2xl shrink-0 border-2 border-nutri-navy/10 self-start sm:self-auto">
                  {member.name[0]}
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl font-black text-nutri-navy uppercase tracking-tighter leading-none">{member.name}</h3>
                  <p className="text-sm font-medium text-nutri-navy/80 italic line-clamp-2 max-w-lg border-l-2 border-nutri-gold pl-3">
                    {booklet?.intro_text ? `"${booklet.intro_text}"` : "Active Engine Room member."}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 shrink-0 sm:pl-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-nutri-navy bg-nutri-cream px-3 py-1.5 border border-nutri-navy/10">
                  📦 {vendorCount} vendors
                </div>
                <Link to={`/booklet/${member.id}`} className="text-[10px] font-black uppercase tracking-widest text-white bg-nutri-gold px-4 py-2 hover:bg-nutri-navy transition-colors flex items-center">
                  View →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
