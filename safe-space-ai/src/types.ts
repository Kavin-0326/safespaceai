export interface Incident {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  timestamp: string;
  location?: string;
  anonymous: boolean;
}

export type Category = 
  | 'Harassment' 
  | 'Theft' 
  | 'Vandalism' 
  | 'Medical Emergency' 
  | 'Suspicious Activity' 
  | 'Other';
