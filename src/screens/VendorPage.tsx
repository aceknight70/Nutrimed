import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

export const VendorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, updateEngagementStatus } = useStore();
  
  const vendor = state.vendors.find(v => v.id === id);
  const engagement = state.engagements.find(e => e.vendor_id === id);
  const member = engagement ? state.members.find(m => m.id === engagement.member_id) : undefined;

  if (!vendor) return <div className="p-8 text-center font-bold uppercase tracking-widest text-sm text-nutri-navy">Vendor not found</div>;

  const isMyVendor = state.currentUser && engagement && engagement.member_id === state.currentUser.id;
  const isAdmin = state.currentUser?.id === 'admin';

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      <button onClick={() => navigate(-1)} className="self-start text-[10px] uppercase font-black tracking-widest text-nutri-navy hover:text-nutri-gold mb-8 flex items-center border border-nutri-navy/20 px-4 py-2 bg-white">
        ← Back to Directory
      </button>

      <div className="bg-white border border-nutri-navy/10 shadow-sm relative flex-1">
        {engagement && (
           <div className={`absolute top-0 right-0 text-white text-[10px] px-4 py-1.5 font-black uppercase tracking-widest ${engagement.status === 'Active' ? 'bg-nutri-green' : 'bg-nutri-red'}`}>
              {engagement.status}
           </div>
        )}
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black text-nutri-navy tracking-tighter uppercase mb-2 leading-none">{vendor.name}</h1>
          <div className="text-xs font-bold tracking-widest uppercase text-nutri-navy/60 mb-10 border-b border-nutri-navy/10 pb-6">
            Room Type: {vendor.type}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-8 space-y-10">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold mb-3 border-l-4 border-nutri-gold pl-3">Description</h3>
                <p className="text-sm md:text-base leading-relaxed font-medium text-nutri-navy/90">{vendor.description}</p>
              </div>
              
              <div className="bg-nutri-cream p-6 md:p-8 border border-nutri-navy/10">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-nutri-navy mb-5 border-b border-nutri-navy/10 pb-3">What They Offer</h3>
                <ul className="space-y-4">
                  {vendor.offers.split(',').map((offer, i) => (
                    <li key={i} className="text-sm font-bold text-nutri-navy flex items-start">
                      <span className="text-nutri-gold mr-3">▪</span> {offer.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 space-y-8">
              <div className="bg-nutri-navy text-white p-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-nutri-gold mb-3 opacity-80">Contact Info</h3>
                <p className="text-xl font-black tracking-tight">{vendor.contact_info}</p>
              </div>

              {member && (
                <div className="border border-nutri-navy/10 p-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-4 border-b border-nutri-navy/10 pb-2">Brought In By</h3>
                  <div className="flex items-center mb-6">
                     <div className="w-10 h-10 bg-nutri-cream flex items-center justify-center font-black text-nutri-navy uppercase shrink-0 border border-nutri-navy/20 text-lg">
                        {member.name[0]}
                     </div>
                     <div className="ml-4">
                       <div className="font-black text-sm uppercase tracking-tight text-nutri-navy leading-none mb-1">{member.name}</div>
                       <Link to={`/booklet/${member.id}`} className="text-[10px] font-bold text-nutri-green uppercase tracking-widest hover:underline">View Booklet →</Link>
                     </div>
                  </div>

                  {(isMyVendor || isAdmin) && engagement && (
                    <div className="border-t border-nutri-navy/10 pt-6 flex flex-col gap-3">
                      <button 
                        onClick={() => updateEngagementStatus(engagement.id, 'Active')}
                        className={`w-full py-3 text-[10px] font-black uppercase tracking-widest border ${engagement.status === 'Active' ? 'bg-nutri-green text-white border-nutri-green' : 'bg-white text-nutri-green border-nutri-green hover:bg-nutri-green/10'}`}
                      >
                        Set Active
                      </button>
                      <button 
                        onClick={() => updateEngagementStatus(engagement.id, 'Needs Follow-Up')}
                        className={`w-full py-3 text-[10px] font-black uppercase tracking-widest border ${engagement.status === 'Needs Follow-Up' ? 'bg-nutri-red text-white border-nutri-red' : 'bg-white text-nutri-red border-nutri-red hover:bg-nutri-red/10'}`}
                      >
                        Set Follow-Up
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
