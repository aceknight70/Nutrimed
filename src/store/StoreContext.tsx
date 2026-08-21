import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Vendor, VendorEngagement, ClassroomEntry, Booklet, Member, Person, PersonGuardian } from '../types';

const SEED_DATA: AppState = {
  vendors: [
    { id: 'v1', name: 'St. Mary\'s Clinic', type: 'Hospitals & Health Hubs', description: 'Local community clinic.', offers: 'Prenatal care, routine checkups', contact_info: '+233 50 111 2222', photos: [], created_at: new Date().toISOString() },
    { id: 'v2', name: 'Patricia\'s Market Store', type: 'Market Stalls', description: 'Fresh local produce daily.', offers: 'Organic vegetables, fruits, grains', contact_info: '+233 50 222 3333', photos: [], created_at: new Date(Date.now() - 10000).toISOString() },
    { id: 'v3', name: 'Mr. Johnson\'s Health Hub', type: 'Hospitals & Health Hubs', description: 'Suppliers of medical grade supplements.', offers: 'Vitamins, Supplements, Dietary advice', contact_info: 'info@healthhub.com', photos: [], created_at: new Date(Date.now() - 20000).toISOString() },
    { id: 'v4', name: 'Green Leaf Vegan Meals', type: 'Restaurants & Other Food Vendors', description: 'Plant-based meals for hospitals and schools.', offers: 'Vegan catering, bulk meals', contact_info: '+233 50 333 4444', photos: [], created_at: new Date(Date.now() - 30000).toISOString() },
    { id: 'v5', name: 'Okaikoi Wellness Center', type: 'Support Businesses', description: 'Mental health and wellness counseling.', offers: 'Counseling, therapy sessions', contact_info: '+233 50 444 5555', photos: [], created_at: new Date(Date.now() - 40000).toISOString() },
    { id: 'v6', name: 'Sunrise Bakery', type: 'Restaurants & Other Food Vendors', description: 'Whole grain and gluten-free breads.', offers: 'Gluten-free bread, pastries', contact_info: '+233 50 555 6666', photos: [], created_at: new Date(Date.now() - 50000).toISOString() },
    { id: 'v7', name: 'Mercy General Hospital', type: 'Hospitals & Health Hubs', description: 'Main district hospital.', offers: 'Emergency care, specialized treatments', contact_info: '+233 50 666 7777', photos: [], created_at: new Date(Date.now() - 60000).toISOString() },
    { id: 'v8', name: 'Kweku\'s Farm Fresh', type: 'Market Stalls', description: 'Direct from farm yams and plantains.', offers: 'Yams, plantains, tubers', contact_info: '+233 50 777 8888', photos: [], created_at: new Date(Date.now() - 70000).toISOString() },
    { id: 'v9', name: 'CarePlus Pharmacy', type: 'Support Businesses', description: '24/7 pharmacy and health supplies.', offers: 'Medications, first aid', contact_info: '+233 50 888 9999', photos: [], created_at: new Date(Date.now() - 80000).toISOString() },
    { id: 'v10', name: 'Nutri-Juice Bar', type: 'Restaurants & Other Food Vendors', description: 'Cold-pressed juices and smoothies.', offers: 'Fresh juices, detox smoothies', contact_info: '+233 50 999 0000', photos: [], created_at: new Date(Date.now() - 90000).toISOString() },
    { id: 'v11', name: 'Dr. Mensah\'s Diet Clinic', type: 'Hospitals & Health Hubs', description: 'Specialized dietary consulting.', offers: 'Diet plans, nutritional counseling', contact_info: '+233 50 101 2020', photos: [], created_at: new Date(Date.now() - 100000).toISOString() },
    { id: 'v12', name: 'Aunty Esi\'s Spices', type: 'Market Stalls', description: 'Locally sourced and blended spices.', offers: 'Spices, herbs, seasonings', contact_info: '+233 50 202 3030', photos: [], created_at: new Date(Date.now() - 110000).toISOString() },
    { id: 'v13', name: 'FitLife Gym', type: 'Support Businesses', description: 'Community fitness center.', offers: 'Workout plans, physical therapy', contact_info: '+233 50 303 4040', photos: [], created_at: new Date(Date.now() - 120000).toISOString() },
    { id: 'v14', name: 'The Healthy Bowl', type: 'Restaurants & Other Food Vendors', description: 'Salads and healthy lunch bowls.', offers: 'Salads, quinoa bowls', contact_info: '+233 50 404 5050', photos: [], created_at: new Date(Date.now() - 130000).toISOString() },
    { id: 'v15', name: 'Hope Maternity Ward', type: 'Hospitals & Health Hubs', description: 'Specialized care for mothers.', offers: 'Maternal care, baby supplies', contact_info: '+233 50 505 6060', photos: [], created_at: new Date(Date.now() - 140000).toISOString() },
    { id: 'v16', name: 'Nima Organic Market', type: 'Market Stalls', description: 'Community run organic market.', offers: 'Organic staples, vegetables', contact_info: '+233 50 606 7070', photos: [], created_at: new Date(Date.now() - 150000).toISOString() },
    { id: 'v17', name: 'SafeHands Logistics', type: 'Support Businesses', description: 'Cold chain transport for medical food.', offers: 'Refrigerated transport', contact_info: '+233 50 707 8080', photos: [], created_at: new Date(Date.now() - 160000).toISOString() },
    { id: 'v18', name: 'Mama\'s Kitchen', type: 'Restaurants & Other Food Vendors', description: 'Local dishes made healthy.', offers: 'Low-sodium local meals', contact_info: '+233 50 808 9090', photos: [], created_at: new Date(Date.now() - 170000).toISOString() },
    { id: 'v19', name: 'Community Eye Care', type: 'Hospitals & Health Hubs', description: 'Vision testing and glasses.', offers: 'Eye exams, glasses', contact_info: '+233 50 909 1010', photos: [], created_at: new Date(Date.now() - 180000).toISOString() },
    { id: 'v20', name: 'Zongo Fresh Fish', type: 'Market Stalls', description: 'Daily catch from local fishermen.', offers: 'Fresh fish, seafood', contact_info: '+233 50 121 2121', photos: [], created_at: new Date(Date.now() - 190000).toISOString() }
  ],
  members: [
    { id: 'm1', name: 'Amina', earnings_log: '1240', login: 'amina' },
    { id: 'm2', name: 'Kofi', earnings_log: '800', login: 'kofi' },
    { id: 'm3', name: 'Zara', earnings_log: '1500', login: 'zara' },
    { id: 'm4', name: 'Kwame', earnings_log: '450', login: 'kwame' },
    { id: 'm5', name: 'Abena', earnings_log: '620', login: 'abena' },
    { id: 'm6', name: 'Yaw', earnings_log: '1100', login: 'yaw' },
    { id: 'm7', name: 'Esi', earnings_log: '300', login: 'esi' },
    { id: 'm8', name: 'Kwasi', earnings_log: '950', login: 'kwasi' },
    { id: 'm9', name: 'Ama', earnings_log: '1340', login: 'ama' },
    { id: 'm10', name: 'Kwabena', earnings_log: '720', login: 'kwabena' },
    { id: 'm11', name: 'Akua', earnings_log: '540', login: 'akua' },
    { id: 'm12', name: 'Kweku', earnings_log: '890', login: 'kweku' },
    { id: 'm13', name: 'Yaa', earnings_log: '1050', login: 'yaa' },
    { id: 'm14', name: 'Kwadwo', earnings_log: '400', login: 'kwadwo' },
    { id: 'm15', name: 'Adwoa', earnings_log: '1600', login: 'adwoa' }
  ],
  engagements: Array.from({ length: 20 }).map((_, i) => ({
    id: 'e' + (i + 1),
    member_id: 'm' + ((i % 15) + 1),
    vendor_id: 'v' + (i + 1),
    status: i % 3 === 0 ? 'Needs Follow-Up' : 'Active',
    brought_in_date: new Date(Date.now() - i * 10000).toISOString()
  })) as VendorEngagement[],
  people: [
    { id: 'p1', name: 'Grace Ofori', needs: 'Low-sodium meals, twice a week', created_at: new Date().toISOString() },
    { id: 'p2', name: 'Samuel Koomson', needs: 'Diabetic-friendly groceries', created_at: new Date().toISOString() },
    { id: 'p3', name: 'Auntie Mary', needs: 'Fresh fruits and vegetables delivery', created_at: new Date().toISOString() },
  ],
  guardians: [
    { id: 'g1', member_id: 'm1', person_id: 'p1', status: 'Active', assigned_date: new Date().toISOString() },
    { id: 'g2', member_id: 'm3', person_id: 'p2', status: 'Active', assigned_date: new Date().toISOString() },
    { id: 'g3', member_id: 'm2', person_id: 'p3', status: 'Needs Follow-Up', assigned_date: new Date().toISOString() },
  ],
  classroom: [
    { id: 'c1', title: 'Outreach — how to bring people in and keep them engaged', content: 'Start with a warm talk. Explain the vision of NutriMed. Show them how being in the directory helps their business grow while supporting the community.', order: 1, created_at: new Date().toISOString() }
  ],
  booklets: [
    { id: 'b1', member_id: 'm1', display_name: 'Amina\'s Booklet', intro_text: 'I connect restaurants with local farms.' },
    { id: 'b2', member_id: 'm3', display_name: 'Zara\'s Booklet', intro_text: 'Logistics for health partners.' },
    { id: 'b3', member_id: 'm2', display_name: 'Kofi\'s Booklet', intro_text: 'I do graphic design for small businesses.' },
    { id: 'b4', member_id: 'm4', display_name: 'Kwame\'s Booklet', intro_text: 'Working with hospitals to improve their supply chains.' },
    { id: 'b5', member_id: 'm9', display_name: 'Ama\'s Booklet', intro_text: 'Helping organic markets reach more people.' }
  ],
  currentUser: null
};

interface StoreContextType {
  state: AppState;
  login: (username: string) => void;
  logout: () => void;
  addVendor: (vendor: Omit<Vendor, 'id' | 'created_at'>) => void;
  updateEngagementStatus: (engagementId: string, status: 'Active' | 'Needs Follow-Up') => void;
  updateBookletIntro: (memberId: string, intro: string) => void;
  updateBookletProfile: (memberId: string, updates: Partial<Booklet & { name: string, photo: string }>) => void;
  addPerson: (person: Omit<Person, 'id' | 'created_at'>) => void;
  addClassroomEntry: (entry: Omit<ClassroomEntry, 'id' | 'created_at'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(SEED_DATA);

  const login = (username: string) => {
    if (username === 'admin') {
       setState(s => ({ ...s, currentUser: { id: 'admin', name: 'Admin', earnings_log: '0', login: 'admin' } }));
    } else {
       const member = state.members.find(m => m.login?.toLowerCase() === username.toLowerCase());
       if (member) {
           setState(s => ({ ...s, currentUser: member }));
       } else {
           alert("User not found (Try 'amina', 'kofi', or 'admin')");
       }
    }
  };

  const logout = () => setState(s => ({ ...s, currentUser: null }));

  const addVendor = (vendorData: Omit<Vendor, 'id' | 'created_at'>) => {
    if (!state.currentUser || state.currentUser.id === 'admin') return; 

    const newVendor: Vendor = {
      ...vendorData,
      id: `v${Date.now()}`,
      created_at: new Date().toISOString()
    };

    const newEngagement: VendorEngagement = {
      id: `e${Date.now()}`,
      member_id: state.currentUser.id,
      vendor_id: newVendor.id,
      status: 'Needs Follow-Up',
      brought_in_date: new Date().toISOString()
    };

    setState(s => ({
      ...s,
      vendors: [newVendor, ...s.vendors],
      engagements: [newEngagement, ...s.engagements]
    }));
  };

  const updateEngagementStatus = (engagementId: string, status: 'Active' | 'Needs Follow-Up') => {
    setState(s => ({
      ...s,
      engagements: s.engagements.map(e => e.id === engagementId ? { ...e, status } : e)
    }));
  };

  const updateBookletIntro = (memberId: string, intro: string) => {
    setState(s => {
      const existing = s.booklets.find(b => b.member_id === memberId);
      if (existing) {
        return {
          ...s,
          booklets: s.booklets.map(b => b.member_id === memberId ? { ...b, intro_text: intro } : b)
        };
      } else {
        const member = s.members.find(m => m.id === memberId);
        return {
          ...s,
          booklets: [...s.booklets, { id: `b${Date.now()}`, member_id: memberId, display_name: `${member?.name}'s Booklet`, intro_text: intro }]
        }
      }
    });
  };

  const updateBookletProfile = (memberId: string, updates: Partial<Booklet & { name: string, photo: string }>) => {
    setState(s => {
      let newMembers = [...s.members];
      if (updates.name !== undefined || updates.photo !== undefined) {
        newMembers = newMembers.map(m => m.id === memberId ? { ...m, name: updates.name || m.name, photo: updates.photo !== undefined ? updates.photo : m.photo } : m);
      }
      
      let newBooklets = [...s.booklets];
      const existing = newBooklets.find(b => b.member_id === memberId);
      if (existing) {
        newBooklets = newBooklets.map(b => b.member_id === memberId ? { ...b, ...updates } : b);
      } else {
        newBooklets.push({ id: `b${Date.now()}`, member_id: memberId, display_name: `${newMembers.find(m=>m.id===memberId)?.name}'s Booklet`, intro_text: updates.intro_text || '', business_name: updates.business_name });
      }
      return { ...s, members: newMembers, booklets: newBooklets };
    });
  };

  const addPerson = (personData: Omit<Person, 'id' | 'created_at'>) => {
    if (!state.currentUser) return;
    const newPerson: Person = {
      ...personData,
      id: `p${Date.now()}`,
      created_at: new Date().toISOString()
    };
    const newGuardian: PersonGuardian = {
      id: `g${Date.now()}`,
      member_id: state.currentUser.id,
      person_id: newPerson.id,
      status: 'Active',
      assigned_date: new Date().toISOString()
    };
    setState(s => ({
      ...s,
      people: [newPerson, ...s.people],
      guardians: [newGuardian, ...s.guardians]
    }));
  };

  const addClassroomEntry = (entryData: Omit<ClassroomEntry, 'id' | 'created_at'>) => {
    const newEntry: ClassroomEntry = {
      ...entryData,
      id: `c${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setState(s => ({
      ...s,
      classroom: [...s.classroom, newEntry]
    }));
  };

  return (
    <StoreContext.Provider value={{ state, login, logout, addVendor, updateEngagementStatus, updateBookletIntro, updateBookletProfile, addPerson, addClassroomEntry }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
