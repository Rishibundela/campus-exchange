export interface Item {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  seller: {
    name: string;
    college: string;
    year: string;
    avatar: string;
    rating: number;
  };
  condition: "New" | "Like New" | "Good" | "Fair";
  status: "available" | "sold";
  createdAt: string;
  location: string;
}

export const categories = [
  { name: "Books", icon: "📚", count: 124 },
  { name: "Electronics", icon: "💻", count: 89 },
  { name: "Stationery", icon: "✏️", count: 56 },
  { name: "Notes", icon: "📝", count: 203 },
  { name: "Lab Equipment", icon: "🔬", count: 34 },
  { name: "Gadgets", icon: "📱", count: 67 },
  { name: "Art Supplies", icon: "🎨", count: 45 },
  { name: "Sports", icon: "⚽", count: 28 },
];

export const mockItems: Item[] = [
  {
    id: "1",
    title: "Engineering Mathematics by B.S. Grewal",
    price: 350,
    category: "Books",
    description: "3rd edition, well maintained with some highlights. Perfect for 1st and 2nd year engineering students.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    seller: { name: "Arjun Mehta", college: "LNCT Bhopal", year: "3rd Year", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4.5 },
    condition: "Good",
    status: "available",
    createdAt: "2026-03-08",
    location: "North Campus",
  },
  {
    id: "2",
    title: "Casio FX-991EX Scientific Calculator",
    price: 800,
    category: "Electronics",
    description: "Barely used, comes with original box. All functions working perfectly.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    seller: { name: "Priya Sharma", college: "LNCT Bhopal", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 4.8 },
    condition: "Like New",
    status: "available",
    createdAt: "2026-03-09",
    location: "South Campus",
  },
  {
    id: "3",
    title: "Complete Data Structures Notes — Handwritten",
    price: 150,
    category: "Notes",
    description: "Comprehensive handwritten notes covering all DSA topics. Got 9.5 CGPA using these!",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop",
    seller: { name: "Rahul Verma", college: "LNCT Bhopal", year: "4th Year", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 4.9 },
    condition: "Good",
    status: "available",
    createdAt: "2026-03-10",
    location: "Library Block",
  },
  {
    id: "4",
    title: "Arduino Starter Kit with Sensors",
    price: 1200,
    category: "Electronics",
    description: "Complete Arduino UNO kit with 20+ sensors, breadboard, jumper wires. Used for one semester project.",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop",
    seller: { name: "Sneha Gupta", college: "LNCT Bhopal", year: "3rd Year", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 4.3 },
    condition: "Good",
    status: "available",
    createdAt: "2026-03-07",
    location: "ECE Block",
  },
  {
    id: "5",
    title: "Staedtler Drawing Instrument Set",
    price: 450,
    category: "Stationery",
    description: "Professional drafting set, barely used. Perfect for Engineering Drawing course.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
    seller: { name: "Karan Singh", college: "LNCT Bhopal", year: "1st Year", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 4.0 },
    condition: "Like New",
    status: "available",
    createdAt: "2026-03-06",
    location: "Mechanical Block",
  },
  {
    id: "6",
    title: "Physics Lab Manual + Equipment Kit",
    price: 600,
    category: "Lab Equipment",
    description: "Complete physics lab kit including vernier calipers, spherometer, and lab manual.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
    seller: { name: "Ananya Reddy", college: "LNCT Bhopal", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", rating: 4.6 },
    condition: "Good",
    status: "available",
    createdAt: "2026-03-05",
    location: "Physics Block",
  },
];
