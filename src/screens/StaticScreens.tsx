import React, { useState } from 'react';

export const Wellness = () => (
  <div className="max-w-6xl mx-auto h-full flex flex-col">
    <div className="mb-10 border-b border-nutri-navy/10 pb-6 shrink-0">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-nutri-navy mb-2">Wellbeing and Mental Health</h1>
      <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-gold">Room 07</p>
    </div>
    
    <div className="flex-1 overflow-y-auto space-y-8 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border-l-8 border-nutri-navy p-10 shadow-sm flex flex-col">
          <h2 className="text-2xl font-black uppercase tracking-tight text-nutri-navy mb-6">Wellness Partnership</h2>
          <p className="text-nutri-navy/90 font-medium text-base leading-relaxed">
            A funded, income-generating wellness partnership — We ensure people are healthy, and supported through formal partnerships.
          </p>
        </div>
        <div className="bg-white border-l-8 border-nutri-gold p-10 shadow-sm flex flex-col">
          <h2 className="text-2xl font-black uppercase tracking-tight text-nutri-navy mb-6">Mental Health Support</h2>
          <p className="text-nutri-navy/90 font-medium text-base leading-relaxed">
            Building something new is high pressure. This space provides mental health and well-being support for the youth themselves, giving them a place to turn for support while driving the directory's growth.
          </p>
        </div>
      </div>

      <div className="bg-nutri-cream border border-nutri-navy/10 p-10 shadow-sm flex flex-col">
        <h2 className="text-2xl font-black uppercase tracking-tight text-nutri-navy mb-8 border-b border-nutri-navy/10 pb-4">SDG 3.4 Alignment</h2>
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 border-l-4 border-nutri-gold pl-5">
            <h3 className="text-lg font-black text-nutri-navy uppercase tracking-tight">Target 3.4</h3>
            <p className="text-nutri-navy/90 font-medium text-sm md:text-base leading-relaxed">
              By 2030, reduce premature mortality from non-communicable diseases by a third through prevention and treatment, and promote mental health and well-being.
            </p>
          </div>
          <div className="flex flex-col space-y-2 border-l-4 border-nutri-navy/20 pl-5">
            <h3 className="text-sm font-black text-nutri-navy uppercase tracking-tight">Indicator 3.4.1</h3>
            <p className="text-nutri-navy/80 text-sm leading-relaxed italic">
              Mortality rate attributed to cardiovascular disease, cancer, diabetes, or chronic respiratory disease.
            </p>
          </div>
          <div className="flex flex-col space-y-2 border-l-4 border-nutri-navy/20 pl-5">
            <h3 className="text-sm font-black text-nutri-navy uppercase tracking-tight">Indicator 3.4.2</h3>
            <p className="text-nutri-navy/80 text-sm leading-relaxed italic">
              Suicide mortality rate. This is where NutriMed's Wellbeing room directly connects — mental health and well-being is written directly into this target.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SDG = () => {
  const sdgs = [
    {
      goal: 'SDG 1 — No Poverty',
      target: 'Target 1.4: By 2030, ensure all people have equal rights to economic resources, access to basic services, and control over property and financial services.',
      indicator: 'Indicator 1.4.1: Proportion of population living in households with access to basic services.',
      color: 'bg-[#E5243B]'
    },
    {
      goal: 'SDG 3 — Good Health and Well-Being',
      target: 'Target 3.4: By 2030, reduce premature mortality from non-communicable diseases through prevention and treatment, and promote mental health and well-being.',
      indicator: 'Indicator 3.4.1: Mortality rate attributed to cardiovascular disease, cancer, diabetes, or chronic respiratory disease.\\nIndicator 3.4.2: Suicide mortality rate.',
      color: 'bg-[#4C9F38]'
    },
    {
      goal: 'SDG 4 — Quality Education',
      target: 'Target 4.4: By 2030, substantially increase the number of youth and adults with relevant skills for employment, decent jobs, and entrepreneurship.',
      indicator: 'Indicator 4.4.1: Proportion of youth and adults with ICT skills, by type of skill.',
      color: 'bg-[#C5192D]'
    },
    {
      goal: 'SDG 8 — Decent Work and Economic Growth',
      target: 'Target 8.3: Promote development-oriented policies supporting productive activities, decent job creation, entrepreneurship, and growth of micro/small enterprises.',
      indicator: 'Indicator 8.3.1: Proportion of informal employment in non-agricultural employment, by sex.',
      color: 'bg-[#A21942]'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-10 border-b border-nutri-navy/10 pb-6 shrink-0">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-nutri-navy mb-2">SDG Alignment</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-gold">Room 08</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 overflow-y-auto">
        {sdgs.map((sdg, idx) => (
          <SDGCard key={idx} sdg={sdg} />
        ))}
      </div>
    </div>
  );
};

const SDGCard = ({ sdg }: { key?: React.Key; sdg: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer bg-white border border-nutri-navy/10 shadow-sm flex flex-col hover:shadow-md transition-shadow">
      <div className={`${sdg.color} text-white p-6 flex justify-between items-center`}>
        <h2 className="text-xl font-black uppercase tracking-tight">{sdg.goal}</h2>
        <span className="text-2xl font-black">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold mb-1">Target</h3>
            <p className="text-sm font-medium text-nutri-navy leading-relaxed">{sdg.target}</p>
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-nutri-gold mb-1">Indicator</h3>
            <p className="text-sm font-medium text-nutri-navy leading-relaxed whitespace-pre-line">{sdg.indicator}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const Legitimacy = () => (
  <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center">
    <div className="mb-12">
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-nutri-navy mb-4">Legitimacy</h1>
      <p className="text-[10px] font-bold uppercase tracking-widest text-nutri-gold">Room 09</p>
    </div>
    
    <div className="bg-white p-10 border border-nutri-navy/10 shadow-sm w-full">
      <h2 className="text-[10px] font-black text-nutri-navy opacity-60 uppercase tracking-widest mb-8 pb-3 border-b border-nutri-navy/10">
        Supported through / Recognized under
      </h2>
      <ul className="space-y-6 text-left inline-block">
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy flex items-center">
          <span className="w-3 h-3 bg-nutri-gold mr-4 inline-block shrink-0"></span>DEEVOICE Institute of Readiness and Reach
        </li>
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy flex items-center">
          <span className="w-3 h-3 bg-nutri-gold mr-4 inline-block shrink-0"></span>Youth Team Development & Innovation Hub
        </li>
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy flex items-center">
          <span className="w-3 h-3 bg-nutri-gold mr-4 inline-block shrink-0"></span>SDGs Learning Lab
        </li>
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy flex items-center">
          <span className="w-3 h-3 bg-nutri-gold mr-4 inline-block shrink-0"></span>Safehouse Missions
        </li>
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy flex items-center">
          <span className="w-3 h-3 bg-nutri-gold mr-4 inline-block shrink-0"></span>Storytelling and Creativity Polytechnic
        </li>
        <li className="text-xl md:text-2xl font-black uppercase tracking-tight text-nutri-navy/50 flex items-center">
          ......
        </li>
      </ul>
    </div>
  </div>
);

export const StillGrowing = () => (
  <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-8 text-center border-8 border-nutri-navy/10 bg-white">
    <h1 className="text-6xl md:text-8xl font-black text-nutri-navy mb-6 tracking-tighter uppercase italic leading-none">Still<br/>Growing.</h1>
    <p className="text-sm md:text-base text-nutri-gold font-bold uppercase tracking-widest mb-16">
      More rooms, more vendors, more youth.
    </p>
    <div className="bg-nutri-navy text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest shadow-sm">
      Engine Room Built
    </div>
  </div>
);
