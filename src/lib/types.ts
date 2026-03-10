export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      items: {
        Row: Item;
        Insert: Omit<Item, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Item, "id" | "created_at">>;
      };
      wishlist: {
        Row: WishlistEntry;
        Insert: Omit<WishlistEntry, "id" | "created_at">;
        Update: never;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at">;
        Update: Partial<Pick<Message, "read">>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at">;
        Update: never;
      };
    };
  };
}

export interface Profile {
  id: string;
  name: string;
  college: string | null;
  course: string | null;
  year: string | null;
  avatar_url: string | null;
  contact_info: string | null;
  created_at: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  status: "available" | "sold";
  image_url: string | null;
  location: string | null;
  seller_id: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  seller?: Profile;
}

export interface WishlistEntry {
  id: string;
  user_id: string;
  item_id: string;
  created_at: string;
  // Joined fields
  item?: Item & { seller?: Profile };
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  item_id: string | null;
  content: string;
  read: boolean;
  created_at: string;
  // Joined fields
  sender?: Profile;
  receiver?: Profile;
  item?: Item;
}

export interface Review {
  id: string;
  reviewer_id: string;
  seller_id: string;
  item_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  // Joined fields
  reviewer?: Profile;
}
