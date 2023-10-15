export interface Customer {

   id: any;

  uid?: string;
  avatar?: string;

  cover?: string;
  cityOrigin?: string;
  dob?: string; // you can be more specific here if you know the exact type
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  quote?: string;
};

export interface CustomerLog {
  uid: string;
  createdAt: number;
  description: string;
  ip: string;
  method: string;
  route: string;
  status: number;
}




