import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Menu, X } from 'lucide-react';

export const Layout = () => {
  const { state, login, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);

  const handleLogin = () => {
    const user = prompt('Enter your Engine Room username (amina, kofi, zara, or admin):');
    if (user) login(user);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠', primary: true },
    { to: '/directory', label: 'Directory', icon: '📂', primary: true },
    { to: '/people', label: 'People', icon: '🫂', primary: true },
    { to: '/youth', label: 'Youth', icon: '👥', primary: true },
    { to: '/classroom', label: 'Outreach & Training', icon: '📖', primary: false },
    { to: '/wellness', label: 'Wellbeing', icon: '🌿', primary: true },
    { to: '/sdg', label: 'SDG Alignment', icon: '🎯', primary: false },
    { to: '/legitimacy', label: 'Legitimacy', icon: '🛡️', primary: false },
    { to: '/still-growing', label: 'Still Growing', icon: '🌱', primary: false },
  ];

  if (state.currentUser) {
    navLinks.splice(4, 0, { to: `/booklet/${state.currentUser.id}`, label: 'My Booklet', icon: '⚡', primary: true });
  }

  React.useEffect(() => {
    setShowMore(false);
  }, [location.pathname]);

  const activeLabel = navLinks.find(l => l.to === location.pathname)?.label || 'Directory';
  const primaryLinks = navLinks.filter(l => l.primary);
  const secondaryLinks = navLinks.filter(l => !l.primary);

  return (
    <div className="h-screen w-full flex flex-col bg-nutri-cream font-sans text-nutri-navy overflow-hidden relative pb-16 md:pb-20">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-16 bg-white border-b border-nutri-navy/10 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-20">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-nutri-cream px-3 py-1.5 border border-nutri-navy/10 truncate max-w-[120px] md:max-w-none">
              Room: {activeLabel}
            </div>
            <button onClick={() => setShowAbout(true)} className="text-[10px] md:text-xs font-bold text-nutri-navy hover:text-nutri-gold uppercase tracking-widest underline underline-offset-4 whitespace-nowrap">
              About NutriMed
            </button>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            {state.currentUser ? (
              <>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] uppercase font-bold text-gray-400 leading-none">Earnings Log</div>
                  <div className="text-lg font-black text-nutri-green leading-none mt-1">₵ {state.currentUser.earnings_log}</div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => navigate('/add-vendor')} className="bg-nutri-gold text-nutri-navy px-3 py-1.5 font-black text-xs shadow-sm hover:opacity-90 uppercase tracking-widest whitespace-nowrap">
                    + Add Vendor
                  </button>
                  <button onClick={logout} className="text-[10px] uppercase font-bold text-nutri-red hover:text-nutri-navy px-2 py-1.5 border border-nutri-red/20 ml-2">Logout</button>
                </div>
              </>
            ) : (
              <button onClick={handleLogin} className="text-xs font-bold text-nutri-gold hover:text-nutri-navy uppercase tracking-wider">Login to Engine Room</button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* More Menu Overlay */}
      {showMore && (
        <div className="absolute bottom-16 md:bottom-20 left-0 right-0 bg-nutri-navy text-white z-40 border-t-4 border-nutri-gold flex flex-col shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-4 bg-nutri-navy max-w-6xl mx-auto w-full">
            {secondaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`p-4 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/10 ${
                  location.pathname === link.to ? 'bg-white/10 text-nutri-gold font-bold' : 'text-white/70'
                }`}
              >
                <span className="text-2xl mb-2">{link.icon}</span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* About Modal Overlay */}
      {showAbout && (
        <div className="fixed inset-0 bg-nutri-navy/80 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white border-t-8 border-nutri-gold max-w-2xl w-full p-6 md:p-10 relative mt-auto mb-auto">
            <button onClick={() => setShowAbout(false)} className="absolute top-6 right-6 text-nutri-navy hover:text-nutri-gold transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-nutri-navy mb-6">About NutriMed</h2>
            
            <div className="space-y-4 text-sm md:text-base text-nutri-navy/90 font-medium leading-relaxed">
              <p>NutriMed was originated on World Youth Day, at the Delta SDGs Summer Camp, August 2026 — born in a Shark Tank session, through the DEVOICE Institute of Readiness and Reach.</p>
              
              <p>What started as one idea, pitched in one sitting, has kept growing ever since.</p>
              
              <p>NutriMed connects people, health hubs, and businesses to the special food they need for good health and well-being. Hospitals, offices, schools, and other organizations can place orders on behalf of the people they serve — but at the center of it all are the people themselves. Every person who comes to NutriMed is followed up on by a real guardian, not just left to place an order and disappear.</p>
            </div>

            <div className="mt-8 border-t border-nutri-navy/10 pt-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-nutri-navy mb-4">SDGs We Champion:</h3>
              <ul className="space-y-3 text-sm font-bold text-nutri-navy/80">
                <li>— SDG 1: No Poverty<br/><span className="text-nutri-navy/60 ml-4 font-medium">Target 1.4 —</span></li>
                <li>— SDG 3: Good Health & Well-Being<br/><span className="text-nutri-navy/60 ml-4 font-medium">Target 3.4 —</span></li>
                <li>— SDG 4: Quality Education<br/><span className="text-nutri-navy/60 ml-4 font-medium">Target 4.4 —</span></li>
                <li>— SDG 8: Decent Work & Economic Growth<br/><span className="text-nutri-navy/60 ml-4 font-medium">Target 8.3 —</span></li>
              </ul>
            </div>

            <div className="mt-8 border-t border-nutri-navy/10 pt-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-nutri-navy mb-4">Supported through / Recognized under:</h3>
              <ul className="space-y-2 text-sm font-bold text-nutri-navy/80">
                <li>— DEVOICE Institute of Readiness & Reach</li>
                <li>— Youth Development & Innovation Hub</li>
                <li>— SDGs Learning Lab (ESGMC )</li>
                <li>— Safehouse Missions</li>
                <li>— Storytelling and Creativity Polytechnic</li>
                <li>— Chairman NAPS</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full h-16 md:h-20 bg-white border-t border-nutri-navy/10 flex items-center justify-around px-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {primaryLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
                isActive ? 'text-nutri-navy border-t-2 border-nutri-gold -mt-[1px]' : 'text-nutri-navy/50 hover:text-nutri-navy'
              }`}
            >
              <span className="text-xl md:text-2xl mb-1">{link.icon}</span>
              <span className={`text-[9px] md:text-[10px] uppercase tracking-widest truncate max-w-full px-1 ${isActive ? 'font-black' : 'font-bold'}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            showMore || secondaryLinks.some(l => l.to === location.pathname) ? 'text-nutri-navy border-t-2 border-nutri-gold -mt-[1px]' : 'text-nutri-navy/50 hover:text-nutri-navy'
          }`}
        >
          <span className="text-xl md:text-2xl mb-1">...</span>
          <span className={`text-[9px] md:text-[10px] uppercase tracking-widest truncate max-w-full px-1 ${showMore ? 'font-black' : 'font-bold'}`}>
            More
          </span>
        </button>
      </nav>
    </div>
  );
};
