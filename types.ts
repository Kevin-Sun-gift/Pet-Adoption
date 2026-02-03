
export interface Pet {
  id: string;
  name: string;
  breed: string;
  type: 'dog' | 'cat' | 'rabbit' | 'other';
  gender: 'male' | 'female';
  age: string;
  weight?: string;
  distance: string;
  price: number;
  description: string;
  image: string;
  owner: {
    name: string;
    role: string;
    avatar: string;
  };
  health: string[];
  location: string;
}

export interface Story {
  id: string;
  title: string;
  image: string;
}

export type Screen = 'welcome' | 'home' | 'detail' | 'apply1' | 'apply2' | 'applySuccess' | 'chat';
export type Tab = 'home' | 'favorite' | 'message' | 'profile';

export interface Message {
  role: 'user' | 'model' | 'system';
  text: string;
  time?: string;
}
