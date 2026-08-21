export type VendorType = 'All' | 'Hospitals & Health Hubs' | 'Restaurants & Other Food Vendors' | 'Market Stalls' | 'Support Businesses' | 'Youth Team Connect';

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  description: string;
  offers: string;
  contact_info: string;
  photos: string[];
  created_at: string;
}

export interface Person {
  id: string;
  name: string;
  needs: string; // what food, how often, conditions
  created_at: string;
}

export interface PersonGuardian {
  id: string;
  member_id: string; // Engine Room youth
  person_id: string;
  status: 'Active' | 'Needs Follow-Up';
  assigned_date: string;
}

export interface Member {
  id: string;
  name: string;
  photo?: string;
  login?: string;
  earnings_log: string;
}

export interface VendorEngagement {
  id: string;
  member_id: string;
  vendor_id: string;
  status: 'Active' | 'Needs Follow-Up';
  follow_up_notes?: string;
  brought_in_date: string;
}

export interface ClassroomEntry {
  id: string;
  title: string;
  content: string;
  order: number;
  created_at: string;
}

export interface Booklet {
  id: string;
  member_id: string;
  display_name: string;
  intro_text: string;
  business_name?: string; // New: their own business name
}

export interface AppState {
  vendors: Vendor[];
  members: Member[];
  engagements: VendorEngagement[];
  people: Person[];
  guardians: PersonGuardian[];
  classroom: ClassroomEntry[];
  booklets: Booklet[];
  currentUser: Member | null;
}
