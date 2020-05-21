import { Photo } from './photo';
export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  created: Date;
  lastactive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  intreoduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
