import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { VendorType } from '../types';

export const AddVendor = () => {
  const { state, addVendor } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState<VendorType>('Restaurant');
  const [offers, setOffers] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  if (!state.currentUser) {
    return <div className="p-8 text-center text-sm font-bold uppercase tracking-widest text-nutri-navy">Please log in to add vendors.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !offers || !contactInfo) return;

    addVendor({
      name,
      type,
      offers,
      description,
      contact_info: contactInfo,
      photos: []
    });
    navigate('/directory');
  };

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-nutri-navy mb-1">Bring In Vendor</h2>
        <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-gold">Room 04 / Adding</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-nutri-navy/10 p-6 md:p-10 shadow-sm flex-1 mb-8">
        <div className="space-y-6 md:space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-3">Vendor Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-nutri-cream border border-nutri-navy/20 px-5 py-4 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy focus:ring-1 focus:ring-nutri-navy rounded-none"
              placeholder="E.g. Green Kitchen"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-3">Type</label>
            <div className="relative">
              <select 
                value={type}
                onChange={e => setType(e.target.value as VendorType)}
                className="w-full bg-nutri-cream border border-nutri-navy/20 px-5 py-4 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy focus:ring-1 focus:ring-nutri-navy rounded-none appearance-none cursor-pointer"
              >
                <option value="Hospital">Hospital</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Market">Market</option>
                <option value="Individual Seller">Individual Seller</option>
                <option value="Supplier">Supplier</option>
                <option value="Support businesses">Support businesses</option>
                <option value="YouthTeam Connect">YouthTeam Connect</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-nutri-navy">
                <span className="font-black text-xs">▼</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-3">Description</label>
            <textarea 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-nutri-cream border border-nutri-navy/20 px-5 py-4 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy focus:ring-1 focus:ring-nutri-navy rounded-none resize-none"
              placeholder="Brief overview of the business..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-3">What they offer (comma separated)</label>
            <textarea 
              required
              value={offers}
              onChange={e => setOffers(e.target.value)}
              rows={2}
              className="w-full bg-nutri-cream border border-nutri-navy/20 px-5 py-4 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy focus:ring-1 focus:ring-nutri-navy rounded-none resize-none"
              placeholder="Vegan catering, Bulk produce"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-nutri-navy mb-3">Contact info</label>
            <input 
              required
              type="text" 
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
              className="w-full bg-nutri-cream border border-nutri-navy/20 px-5 py-4 text-sm font-bold text-nutri-navy focus:outline-none focus:border-nutri-navy focus:ring-1 focus:ring-nutri-navy rounded-none"
              placeholder="Phone, email, or physical address"
            />
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-nutri-navy/10 flex justify-end">
          <button type="button" onClick={() => navigate(-1)} className="mr-4 px-6 py-4 text-[10px] font-black tracking-widest uppercase text-nutri-navy border border-nutri-navy/20 hover:bg-nutri-cream transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-10 py-4 bg-nutri-gold text-nutri-navy font-black text-[10px] tracking-widest uppercase hover:bg-nutri-navy hover:text-white transition-colors shadow-sm">
            Submit to Directory
          </button>
        </div>
      </form>
    </div>
  );
};
