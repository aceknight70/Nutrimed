import React from 'react';
import { Link } from 'react-router-dom';

export const Cover = () => {
  return (
    <Link to="/directory" className="flex flex-col h-full bg-nutri-cream p-8 md:p-12 cursor-pointer relative overflow-hidden group">
      <div className="absolute inset-0 border-8 border-nutri-navy/5 m-4 pointer-events-none transition-colors group-hover:border-nutri-gold/30"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full z-10 mt-10">
        <h1 className="text-6xl md:text-[8rem] font-black text-nutri-navy mb-4 tracking-tighter uppercase leading-none">NUTRIMED</h1>
        <h2 className="text-sm md:text-lg text-nutri-gold font-bold uppercase tracking-widest mb-16">Special Food Connect</h2>
        
        <div className="bg-white px-8 py-6 border border-nutri-navy/10 shadow-sm max-w-4xl mx-auto transform transition-transform group-hover:scale-105">
          <p className="text-xl md:text-3xl text-nutri-navy font-black italic tracking-tighter uppercase leading-tight">
            "A GROWING LIST CONNECTING PEOPLE, HEALTH HUBS , SCHOOLS AND BUSINESSES TO SPECIAL FOOD THEY NEED FOR GOOD HEALTH AND WELL-BEING."
          </p>
        </div>

        <div className="bg-nutri-gold text-nutri-navy px-8 py-8 shadow-sm max-w-4xl mx-auto w-full mt-12 border-2 border-nutri-navy/20">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-2">
            ⭐ THE GENESIS OF NUTRIMED
          </h3>
          <p className="text-sm md:text-base font-bold leading-relaxed max-w-2xl mx-auto mb-4">
            The NutriMed idea emerged from Youth Shark Tank-like Sessions in commemoration of World Youth Day initiative by the DEEVoice Institute of Readiness & Reach.
          </p>
          <div className="text-3xl">🌍</div>
        </div>
      </div>
      
      <footer className="w-full text-center pb-4 pt-8 z-10 mt-8 max-w-4xl mx-auto px-4">
        <p className="text-nutri-navy/80 font-black text-xs md:text-sm uppercase tracking-widest">
          Designed by: ESGMC & FATap-CT
        </p>
      </footer>
    </Link>
  );
};
