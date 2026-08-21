import React from 'react';
import { Vendor, VendorEngagement, Member } from '../types';
import { Link } from 'react-router-dom';

interface VendorCardProps {
  key?: React.Key;
  vendor: Vendor;
  engagement?: VendorEngagement;
  member?: Member;
  showStatus?: boolean;
}

export const VendorCard = ({ vendor, engagement, member, showStatus }: VendorCardProps) => {
  const isIndiv = vendor.type === 'Youth Team Connect';
  const shortType = isIndiv ? 'YOUTH' : vendor.type === 'Restaurants & Other Food Vendors' ? 'REST.' : vendor.type.toUpperCase();

  return (
    <div className="bg-white p-5 border border-nutri-navy/10 shadow-sm relative overflow-hidden flex flex-col h-full hover:border-nutri-navy/30 transition-colors">
      {showStatus && engagement && (
        <div className={`absolute top-0 right-0 text-white text-[9px] px-2 py-1 font-bold uppercase tracking-widest ${engagement.status === 'Active' ? 'bg-nutri-green' : 'bg-nutri-red'}`}>
          {engagement.status === 'Active' ? 'Active' : 'Follow-up'}
        </div>
      )}
      <Link to={`/vendor/${vendor.id}`} className="block mb-4 mt-2 hover:opacity-80 transition-opacity">
        <h3 className="font-black text-xl mb-1 leading-none text-nutri-navy tracking-tight">{vendor.name}</h3>
        <p className="text-xs font-medium text-nutri-navy/60 mb-3 line-clamp-2">{vendor.offers}</p>
      </Link>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-nutri-navy/5">
        <span className="text-[10px] font-black bg-nutri-cream px-2 py-1 border border-nutri-navy/10 text-nutri-navy tracking-widest">
          {shortType}
        </span>
        {member && (
          <Link to={`/booklet/${member.id}`} className="text-[10px] font-bold italic text-nutri-green hover:underline tracking-tight">
            via {member.name}'s booklet →
          </Link>
        )}
      </div>
    </div>
  );
};
