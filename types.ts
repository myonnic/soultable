
export enum TabType {
  OVERVIEW = 'Overview',
  INFO = 'Info',
  MENU = 'Menu',
  REVIEWS = 'Reviews',
  PHOTOS = 'Photos'
}

export enum NavItem {
  EXPLORE = 'Explore',
  SAVED = 'Saved',
  DINING = 'Dining',
  GROUPS = 'Groups',
  PROFILE = 'Profile'
}

export interface RestaurantData {
  id: string;
  name: string;
  rating: number;
  categories: string[];
  description: string;
  matchMe: number;
  matchCohort: number;
  matchFriends: number;
  img: string;
  addressJibun: string;
  addressRoad: string;
  phone: string;
  tags: string[];
  priceRange: string;
  location: { lat: string; lng: string };
  latlng?: { lat: number; lng: number };
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  scenario: number;
  members: string[];
}

export interface Contact {
  id: string;
  name: string;
  isMember: boolean;
  avatar: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameKr: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  tags: string[];
  helpfulCount: number;
}
