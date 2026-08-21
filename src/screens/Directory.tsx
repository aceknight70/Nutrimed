import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { VendorType } from '../types';
import { VendorCard } from '../components/VendorCard';
import { useNavigate } from 'react-router-dom';

export const Directory = () => {
  const { state } = useStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<VendorType | 'All'>('All');
  const [aiQuery, setAiQuery] = useState('');
  
  const types: (VendorType | 'All')[] = [
    'All', 
    'Hospitals & Health Hubs', 
    'Restaurants & Other Food Vendors', 
    'Market Stalls', 
    'Support Businesses', 
    'Youth Team Connect'
  ];

  const filteredVendors = [...state.vendors]
    .filter(v => filter === 'All' || v.type === filter)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      {/* AI Guide Pattern */}
      <div className="bg-nutri-navy text-white p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold mb-2">AI Guide</h3>
          <input 
            type="text" 
            placeholder="What kind of special food or support are you looking for?"
            className="w-full bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-nutri-gold transition-colors"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
          />
        </div>
        <button className="bg-nutri-gold text-nutri-navy px-6 py-3 font-black text-[11px] uppercase tracking-widest hover:bg-white transition-colors w-full sm:w-auto mt-4 sm:mt-0 self-end">
          Search
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-nutri-navy">The Growing List</h2>
        
        <div className="flex flex-wrap gap-2">
          {types.map(t => {
            if (t === 'Youth Team Connect') {
              return (
                <button
                  key={t}
                  onClick={() => navigate('/youth')}
                  className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors bg-nutri-gold text-nutri-navy hover:bg-nutri-navy hover:text-white"
                >
                  {t}
                </button>
              );
            }
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  filter === t 
                    ? 'bg-nutri-navy text-white' 
                    : 'bg-white border border-nutri-navy/20 text-nutri-navy hover:bg-nutri-cream'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-nutri-navy/20 bg-white">
          <p className="text-nutri-navy/60 font-bold uppercase tracking-widest text-sm">No vendors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
          {filteredVendors.map(vendor => {
            const engagement = state.engagements.find(e => e.vendor_id === vendor.id);
            const member = engagement ? state.members.find(m => m.id === engagement.member_id) : undefined;
            return (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor} 
                engagement={engagement} 
                member={member} 
                showStatus
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
