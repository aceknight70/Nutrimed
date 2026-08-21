import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { VendorCard } from '../components/VendorCard';

export const Booklet = () => {
  const { id } = useParams<{ id: string }>();
  const { state, updateBookletProfile } = useStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const member = state.members.find(m => m.id === id);
  const booklet = state.booklets.find(b => b.member_id === id);
  const isOwner = state.currentUser?.id === id;

  const [editData, setEditData] = useState({
    name: member?.name || '',
    photo: member?.photo || '',
    business_name: booklet?.business_name || '',
    intro_text: booklet?.intro_text || ''
  });

  React.useEffect(() => {
    if (member || booklet) {
      setEditData({
        name: member?.name || '',
        photo: member?.photo || '',
        business_name: booklet?.business_name || '',
        intro_text: booklet?.intro_text || ''
      });
    }
  }, [member, booklet]);

  if (!member) {
      if (id === 'undefined') {
          return <div className="p-8 text-center text-sm font-bold uppercase tracking-widest text-nutri-navy">Please log in to view your booklet.</div>;
      }
      return <div className="p-8 text-center text-sm font-bold uppercase tracking-widest text-nutri-navy">Booklet not found.</div>;
  }

  const memberEngagements = state.engagements.filter(e => e.member_id === id);
  const memberVendors = memberEngagements
    .map(e => ({ vendor: state.vendors.find(v => v.id === e.vendor_id)!, engagement: e }))
    .filter(v => v.vendor)
    .sort((a, b) => new Date(b.vendor.created_at).getTime() - new Date(a.vendor.created_at).getTime());

  const memberGuardians = state.guardians.filter(g => g.member_id === id);
  const guardedPeople = memberGuardians
    .map(g => ({ person: state.people.find(p => p.id === g.person_id)!, guardian: g }))
    .filter(p => p.person);

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#/booklet/${member.id}`;
    if (navigator.share) {
      navigator.share({
        title: `${member.name}'s NutriMed Booklet`,
        text: "Check out my NutriMed Booklet!",
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Booklet link copied to clipboard!');
    }
  };

  const handleSave = () => {
    if (id && updateBookletProfile) {
        updateBookletProfile(id, editData);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8 border-b border-nutri-navy/10 pb-4 shrink-0">
        <button onClick={() => navigate(-1)} className="text-[10px] uppercase font-black tracking-widest text-nutri-navy hover:text-nutri-gold px-4 py-2 border border-nutri-navy/20 bg-white">
          ← Back
        </button>
        <div className="flex space-x-3">
          {isOwner && (
            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="text-[10px] uppercase font-black tracking-widest text-nutri-navy hover:text-nutri-gold px-4 py-2 border border-nutri-navy/20 bg-white flex items-center">
              {isEditing ? '💾 Save' : '✨ Edit'}
            </button>
          )}
          <button onClick={copyLink} className="text-[10px] uppercase font-black tracking-widest text-white bg-nutri-gold hover:bg-nutri-navy px-4 py-2 flex items-center transition-colors">
            🔗 Share
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-12">
        {/* Profile Section */}
        {isEditing ? (
          <div className="bg-white p-8 border border-nutri-navy/10 shadow-sm mb-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-nutri-navy mb-6 border-b border-nutri-navy/10 pb-2">Edit Your Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">Display Name</label>
                <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:border-nutri-gold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">Photo URL (optional)</label>
                <input type="text" value={editData.photo} onChange={e => setEditData({...editData, photo: e.target.value})} className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:border-nutri-gold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">Your Business Name (optional)</label>
                <input type="text" value={editData.business_name} onChange={e => setEditData({...editData, business_name: e.target.value})} className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:border-nutri-gold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-nutri-navy mb-1">Personal Bio / Tagline</label>
                <textarea value={editData.intro_text} onChange={e => setEditData({...editData, intro_text: e.target.value})} className="w-full bg-nutri-cream border border-nutri-navy/20 px-3 py-2 text-sm focus:border-nutri-gold min-h-[80px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center mb-12">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-6 shadow-md border-4 border-white shrink-0" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-nutri-navy text-white flex items-center justify-center font-black text-6xl mb-6 shadow-md border-4 border-white shrink-0">
                {member.name[0]}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-nutri-navy uppercase tracking-tighter mb-2">{member.name}</h1>
            {booklet?.business_name && (
              <p className="text-sm md:text-lg text-nutri-gold font-black uppercase tracking-widest mb-4">
                {booklet.business_name}
              </p>
            )}
            <div className="bg-nutri-gold text-white font-black text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 shadow-sm inline-block">
              ⭐ {memberVendors.length} Businesses Brought In
            </div>
          </div>
        )}

        {/* Their Own Thing */}
        {!isEditing && (
          <div className="mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-px bg-nutri-gold flex-1 max-w-[60px] md:max-w-[100px]"></div>
              <h2 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold">Their Own Thing</h2>
              <div className="h-px bg-nutri-gold flex-1 max-w-[60px] md:max-w-[100px]"></div>
            </div>
            
            <div className="bg-nutri-cream border border-nutri-navy/10 p-8 md:p-10 text-center max-w-2xl mx-auto shadow-sm">
              <p className="text-sm md:text-base italic font-medium text-nutri-navy leading-relaxed">
                {booklet?.intro_text ? `"${booklet.intro_text}"` : "Active Engine Room member."}
              </p>
            </div>
          </div>
        )}

        {/* My Vendor Roster */}
        <div>
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="h-px bg-nutri-gold flex-1 max-w-[60px] md:max-w-[100px]"></div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold">My Vendor Roster</h2>
            <div className="h-px bg-nutri-gold flex-1 max-w-[60px] md:max-w-[100px]"></div>
          </div>
          
          {memberVendors.length === 0 ? (
            <div className="border-2 border-dashed border-nutri-navy/20 p-12 text-center bg-white mb-12">
              <p className="text-nutri-navy/60 font-bold text-[10px] uppercase tracking-widest">No vendors connected yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {memberVendors.map(({ vendor, engagement }) => (
                <VendorCard key={vendor.id} vendor={vendor} member={member} engagement={engagement} />
              ))}
            </div>
          )}
        </div>

        {/* People I'm Guiding */}
        <div>
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="h-px bg-nutri-navy flex-1 max-w-[60px] md:max-w-[100px]"></div>
            <h2 className="text-[11px] font-black uppercase tracking-widest text-nutri-navy">People I'm Guiding</h2>
            <div className="h-px bg-nutri-navy flex-1 max-w-[60px] md:max-w-[100px]"></div>
          </div>
          
          {guardedPeople.length === 0 ? (
            <div className="border-2 border-dashed border-nutri-navy/20 p-12 text-center bg-white">
              <p className="text-nutri-navy/60 font-bold text-[10px] uppercase tracking-widest">Not guiding anyone yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {guardedPeople.map(({ person, guardian }) => (
                <div key={person.id} className="bg-white border border-nutri-navy/10 p-6 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-nutri-navy">{person.name}</h3>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 ${guardian.status === 'Active' ? 'bg-nutri-green/20 text-nutri-green' : 'bg-nutri-gold text-nutri-navy'}`}>
                      {guardian.status}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-nutri-navy/50 mb-1">Needs</h4>
                    <p className="text-sm font-medium text-nutri-navy leading-relaxed">{person.needs}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share CTA */}
        <div className="mt-8">
          <button onClick={copyLink} className="w-full bg-nutri-gold text-white font-black uppercase tracking-widest py-6 text-xs md:text-sm hover:bg-nutri-navy transition-colors shadow-sm flex items-center justify-center space-x-3">
            <span>🔗 Share this Booklet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
