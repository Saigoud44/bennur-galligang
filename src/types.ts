export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  category: 'aarti' | 'ritual' | 'cultural' | 'prasadam' | 'luckydraw' | 'procession';
  highlight?: boolean;
  iconType?: 'diya' | 'kalash' | 'modak' | 'bell' | 'music' | 'trophy' | 'visarjan';
}

export interface DaySchedule {
  id: string;
  dateStr: string; // e.g. "7 September 2026"
  dayName: string; // e.g. "Day 1 (Monday)"
  badge?: string; // e.g. "Ganesh Chaturthi / Installation"
  summary: string;
  items: ScheduleItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  teluguRole?: string;
  phone: string;
  displayPhone: string;
  whatsappLink?: string;
  badge?: string;
  department?: 'core' | 'rituals' | 'luckydraw' | 'annadanam' | 'cultural' | 'youth' | 'sound';
  avatarUrl?: string;
  isLeader?: boolean;
}

export interface Organizer {
  name: string;
  role: string;
  phone: string;
  displayPhone: string;
  whatsappLink: string;
  instagramHandle?: string;
  instagramUrl?: string;
  badge?: string;
}

export interface FestivalConfig {
  eventTitle: string;
  colonyName: string;
  eventStartDateTime: string;
  eventStartDisplay: string;
  venueAddress: string;
  district: string;
  state: string;
  pinCode: string;
  googleMapsQuery: string;
  googleMapsUrl?: string;
  luckyDrawTokenPrice: number;
  luckyDrawDate: string;
  specialPrize: string;
  countdownDateTime?: string;
  countdownTitle?: string;
  countdownDateDisplay?: string;
  backgroundImageUrl?: string;
  posterImageUrl?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  searchTag?: string;
  nimarjanamDate?: string;
  whatsAppGroupLink?: string;
}

export interface SubscriberRecord {
  id: string;
  fullName: string;
  maskedPhone: string;
  fullPhone: string;
  subscribedAt: string;
  status: string;
  whatsAppReadyNumber: string;
}

export interface TokenRecord {
  id: string;
  tokenNumbers: string[];
  name: string;
  phone: string;
  quantity: number;
  pricePerToken: number;
  totalAmount: number;
  upiId: string;
  paymentMethod: 'upi_qr' | 'phonepe' | 'cash_offline';
  utrNumber?: string;
  status: 'confirmed' | 'verified' | 'pending';
  bookedAt: string;
  notes?: string;
}

export interface TokenBookingRequest {
  name: string;
  phone: string;
  quantity: number;
  utrNumber?: string;
  notes?: string;
}

export interface PoojaBookingRecord {
  id: string;
  bookingNumber: string; // e.g. #PJ-2026-101
  nameWithSurname: string; // Devotee's Name with Surname (ఇంటి పేరుతో సహా పేరు)
  gothram?: string; // Gotram (గోత్రం)
  phone: string;
  poojaType: string;
  poojaDate: string;
  familyMembers?: string;
  specialWishes?: string;
  status: 'confirmed' | 'completed' | 'pending';
  registeredAt: string;
  notes?: string;
}

export interface PoojaBookingRequest {
  nameWithSurname: string;
  gothram?: string;
  phone: string;
  poojaType: string;
  poojaDate: string;
  familyMembers?: string;
  specialWishes?: string;
  notes?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  videoSource?: 'youtube' | 'instagram' | 'direct' | 'upload';
  videoId?: string;
  uploadedBy: string; // Devotee's Name with Surname
  uploaderPhone?: string;
  category: 'idol' | 'pooja' | 'cultural' | 'annadanam' | 'procession' | 'laddu' | 'volunteer' | 'highlights' | string;
  eventYear: '2026' | '2025' | 'earlier' | string;
  createdAt: string;
  uploadedAt?: string;
  likesCount: number;
  isApproved: boolean;
  status?: 'approved' | 'pending' | 'rejected';
  featured?: boolean;
}

export interface MediaUploadRequest {
  type: 'image' | 'video';
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  videoSource?: 'youtube' | 'instagram' | 'direct' | 'upload';
  videoId?: string;
  uploadedBy: string;
  uploaderPhone?: string;
  category: string;
  eventYear?: string;
}
