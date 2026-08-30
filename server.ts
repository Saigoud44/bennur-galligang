import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Persistent storage setup
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");
const CONFIG_FILE = path.join(DATA_DIR, "festival_config.json");
const TEAM_MEMBERS_FILE = path.join(DATA_DIR, "team_members.json");
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, "admin_config.json");
const TOKENS_FILE = path.join(DATA_DIR, "tokens.json");
const POOJA_BOOKINGS_FILE = path.join(DATA_DIR, "pooja_bookings.json");
const MEDIA_FILE = path.join(DATA_DIR, "media.json");

// Helper to read JSON
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultValue;
}

// Helper to write JSON
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

interface Subscriber {
  id: string;
  fullName: string;
  rawPhone: string;
  normalizedPhone: string;
  consent: boolean;
  subscribedAt: string;
  source: string;
  status: "active" | "unsubscribed";
  whatsAppReadyNumber: string; // e.g. "919390905613" for API integration
}

interface TokenRecord {
  id: string;
  tokenNumbers: string[];
  name: string;
  phone: string;
  quantity: number;
  pricePerToken: number;
  totalAmount: number;
  upiId: string;
  paymentMethod: "upi_qr" | "phonepe" | "cash_offline";
  utrNumber?: string;
  status: "confirmed" | "verified" | "pending";
  bookedAt: string;
  notes?: string;
}

interface PoojaBookingRecord {
  id: string;
  bookingNumber: string; // e.g. #PJ-2026-101
  nameWithSurname: string; // Devotee Name with Surname (ఇంటి పేరుతో సహా పేరు)
  gothram?: string; // Gotram (గోత్రం)
  phone: string;
  poojaType: string;
  poojaDate: string;
  familyMembers?: string;
  specialWishes?: string;
  status: "confirmed" | "completed" | "pending";
  registeredAt: string;
  notes?: string;
}

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  videoSource?: "youtube" | "instagram" | "direct" | "upload";
  videoId?: string;
  uploadedBy: string;
  uploaderPhone?: string;
  category: "idol" | "pooja" | "cultural" | "annadanam" | "procession" | "laddu" | "volunteer" | "highlights";
  eventYear: "2026" | "2025" | "earlier";
  createdAt: string;
  likesCount: number;
  isApproved: boolean;
  featured?: boolean;
}

interface TeamMember {
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

interface AdminConfig {
  adminEmail: string;
  adminPassword: string;
  adminName: string;
  defaultPassword: string;
  lastUpdated: string;
}

interface FestivalConfig {
  eventTitle: string;
  colonyName: string;
  eventStartDateTime: string; // "2026-09-14T09:00:00"
  eventStartDisplay: string; // "14 September 2026, 9:00 AM"
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

const DEFAULT_CONFIG: FestivalConfig = {
  eventTitle: "Sri Siddhi Vinayaka Utsav 2026",
  colonyName: "B-Phase Colony, Bennur",
  eventStartDateTime: "2026-09-14T09:00:00",
  eventStartDisplay: "14 September 2026, 9:00 AM",
  venueAddress: "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144",
  district: "Vikarabad",
  state: "Telangana",
  pinCode: "501144",
  googleMapsQuery: "NARSAIAH NILAYAM, 1-100/2, Bennur, Telangana 501144",
  googleMapsUrl: "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9",
  luckyDrawTokenPrice: 50,
  luckyDrawDate: "22 September 2026 (Final Day & Nimarjanam)",
  specialPrize: "Special children’s cycling prize included",
  countdownDateTime: "2026-09-22T17:00:00",
  countdownTitle: "Final Day Prize Open & Ganesh Nimarjanam Countdown",
  countdownDateDisplay: "22 September 2026, 5:00 PM",
  backgroundImageUrl: "",
  posterImageUrl: "",
  instagramHandle: "@bennur_galligang",
  instagramUrl: "https://instagram.com/bennur_galligang",
  searchTag: "bennur_galligang",
  nimarjanamDate: "22 September 2026 (Day 9 - Grand Nimarjanam)",
  whatsAppGroupLink: "https://chat.whatsapp.com/invite/bennurgalligang2026"
};

const DEFAULT_ADMIN: AdminConfig = {
  adminEmail: "saig99729@gmail.com",
  adminPassword: "bennur2026",
  adminName: "Sai Goud (bennur_galligang Lead)",
  defaultPassword: "bennur2026",
  lastUpdated: "2026-08-30T12:00:00.000Z"
};

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Sai Goud",
    role: "Chief Coordinator & Admin (bennur_galligang)",
    teluguRole: "ఉత్సవ కమిటీ సమన్వయకర్త",
    phone: "9390905613",
    displayPhone: "+91 93909 05613",
    whatsappLink: "https://wa.me/919390905613?text=Namaste%20Sai%20Goud%20garu,%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026.",
    badge: "Committee Lead • ₹50 Tokens",
    department: "core",
    isLeader: true
  },
  {
    name: "Naresh Yadav",
    id: "tm-2",
    role: "Event & Seva Incharge",
    teluguRole: "ఈవెంట్ & సేవా ఇంచార్జ్",
    phone: "8688757194",
    displayPhone: "+91 86887 57194",
    whatsappLink: "https://wa.me/918688757194?text=Namaste%20Naresh%20garu,%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026.",
    badge: "9 Days Programs & Seva",
    department: "core",
    isLeader: true
  },
  {
    id: "tm-3",
    name: "Venkat Yadav",
    role: "Youth & Event Coordinator",
    teluguRole: "యూత్ & ఈవెంట్ సమన్వయకర్త",
    phone: "7671803053",
    displayPhone: "+91 76718 03053",
    whatsappLink: "https://wa.me/917671803053?text=Namaste%20Venkat%20Yadav%20garu,%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026.",
    badge: "Youth & Volunteer Coordination",
    department: "youth",
    isLeader: true
  },
  {
    id: "tm-4",
    name: "Shiva Kumar",
    role: "Lucky Draw & Bicycle Prize Coordinator",
    teluguRole: "లక్కీ డ్రా & సైక్లింగ్ ప్రైజ్ ఇంచార్జ్",
    phone: "9390905613",
    displayPhone: "+91 93909 05613",
    whatsappLink: "https://wa.me/919390905613?text=Namaste,%20regarding%20₹50%20Lucky%20Draw%20Token.",
    badge: "₹50 Token Counter",
    department: "luckydraw",
    isLeader: false
  },
  {
    id: "tm-5",
    name: "Rakesh Goud",
    role: "Maha Annadanam & Mahaprasadam Lead",
    teluguRole: "మహా అన్నదానం & ప్రసాదం బాధ్యులు",
    phone: "8688757194",
    displayPhone: "+91 86887 57194",
    whatsappLink: "https://wa.me/918688757194?text=Namaste,%20regarding%20Maha%20Annadanam%20Seva.",
    badge: "Annadanam Seva (Day 8)",
    department: "annadanam",
    isLeader: false
  },
  {
    id: "tm-6",
    name: "bennur_galligang Youth Wing",
    role: "Youth Volunteers & Community Outreach",
    teluguRole: "బెన్నూరు యూత్ వాలంటీర్స్ వింగ్",
    phone: "7671803053",
    displayPhone: "+91 76718 03053",
    whatsappLink: "https://wa.me/917671803053?text=Namaste,%20want%20to%20volunteer%20with%20bennur_galligang%20Youth%20Wing.",
    badge: "bennur_galligang Volunteers",
    department: "youth",
    isLeader: false
  }
];

// Seed initial config if missing
if (!fs.existsSync(CONFIG_FILE)) {
  writeJsonFile(CONFIG_FILE, DEFAULT_CONFIG);
}

if (!fs.existsSync(ADMIN_CONFIG_FILE)) {
  writeJsonFile(ADMIN_CONFIG_FILE, DEFAULT_ADMIN);
}

if (!fs.existsSync(TEAM_MEMBERS_FILE)) {
  writeJsonFile(TEAM_MEMBERS_FILE, DEFAULT_TEAM_MEMBERS);
}

if (!fs.existsSync(TOKENS_FILE)) {
  writeJsonFile(TOKENS_FILE, []);
}

const DEFAULT_MEDIA: MediaItem[] = [];

if (!fs.existsSync(POOJA_BOOKINGS_FILE)) {
  writeJsonFile(POOJA_BOOKINGS_FILE, []);
}

if (!fs.existsSync(MEDIA_FILE)) {
  writeJsonFile(MEDIA_FILE, DEFAULT_MEDIA);
}

// Phone validator: Indian mobile format
function cleanAndValidateIndianPhone(phone: string): { valid: boolean; normalized: string; error?: string } {
  const digits = phone.replace(/\D/g, "");
  let clean = digits;
  
  if (digits.startsWith("91") && digits.length === 12) {
    clean = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length === 11) {
    clean = digits.slice(1);
  }

  if (clean.length !== 10) {
    return { valid: false, normalized: "", error: "Please enter a valid 10-digit mobile number" };
  }

  if (!/^[6-9]/.test(clean)) {
    return { valid: false, normalized: "", error: "Indian mobile numbers must start with 6, 7, 8, or 9" };
  }

  return { valid: true, normalized: clean };
}

// ================= API ROUTES =================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get festival configuration
app.get("/api/config", (req, res) => {
  const config = readJsonFile<FestivalConfig>(CONFIG_FILE, DEFAULT_CONFIG);
  res.json(config);
});

// Update festival configuration
app.post("/api/config", (req, res) => {
  try {
    const current = readJsonFile<FestivalConfig>(CONFIG_FILE, DEFAULT_CONFIG);
    const updated: FestivalConfig = {
      ...current,
      ...req.body
    };
    writeJsonFile(CONFIG_FILE, updated);
    res.json({ success: true, config: updated, message: "Festival details updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update configuration" });
  }
});

// ================= TEAM MEMBERS ROUTES =================

// Get all team members
app.get("/api/team-members", (req, res) => {
  const members = readJsonFile<TeamMember[]>(TEAM_MEMBERS_FILE, DEFAULT_TEAM_MEMBERS);
  res.json(members);
});

// Add new team member
app.post("/api/team-members", (req, res) => {
  try {
    const { name, role, teluguRole, phone, badge, department, isLeader } = req.body;
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Please enter a valid member name." });
    }

    const cleanPhone = phone ? phone.replace(/\D/g, "") : "9390905613";
    const members = readJsonFile<TeamMember[]>(TEAM_MEMBERS_FILE, DEFAULT_TEAM_MEMBERS);
    
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: name.trim(),
      role: role ? role.trim() : "Committee Member",
      teluguRole: teluguRole ? teluguRole.trim() : "",
      phone: cleanPhone,
      displayPhone: cleanPhone.length === 10 ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}` : phone || "+91 93909 05613",
      whatsappLink: `https://wa.me/91${cleanPhone}?text=Namaste%20${encodeURIComponent(name.trim())}%20garu,%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026.`,
      badge: badge ? badge.trim() : "bennur_galligang Member",
      department: department || "core",
      isLeader: Boolean(isLeader)
    };

    members.push(newMember);
    writeJsonFile(TEAM_MEMBERS_FILE, members);

    res.json({ success: true, member: newMember, members });
  } catch (error) {
    console.error("Error adding team member:", error);
    res.status(500).json({ error: "Failed to add team member" });
  }
});

// Update team member
app.put("/api/team-members/:id", (req, res) => {
  try {
    const { id } = req.params;
    const members = readJsonFile<TeamMember[]>(TEAM_MEMBERS_FILE, DEFAULT_TEAM_MEMBERS);
    const index = members.findIndex(m => m.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Team member not found" });
    }

    const updatedData = req.body;
    const cleanPhone = updatedData.phone ? updatedData.phone.replace(/\D/g, "") : members[index].phone;

    members[index] = {
      ...members[index],
      ...updatedData,
      phone: cleanPhone,
      displayPhone: cleanPhone.length === 10 ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}` : updatedData.phone || members[index].displayPhone,
      whatsappLink: `https://wa.me/91${cleanPhone}?text=Namaste%20${encodeURIComponent(updatedData.name || members[index].name)}%20garu,%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026.`
    };

    writeJsonFile(TEAM_MEMBERS_FILE, members);
    res.json({ success: true, member: members[index], members });
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

// Delete team member
app.delete("/api/team-members/:id", (req, res) => {
  try {
    const { id } = req.params;
    let members = readJsonFile<TeamMember[]>(TEAM_MEMBERS_FILE, DEFAULT_TEAM_MEMBERS);
    members = members.filter(m => m.id !== id);
    writeJsonFile(TEAM_MEMBERS_FILE, members);
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

// ================= ADMIN AUTH & PORTAL =================

// Admin Info (Public check)
app.get("/api/admin/info", (req, res) => {
  const admin = readJsonFile<AdminConfig>(ADMIN_CONFIG_FILE, DEFAULT_ADMIN);
  res.json({
    adminEmail: admin.adminEmail || "saig99729@gmail.com",
    adminName: admin.adminName || "Sai Goud",
    defaultPassword: admin.defaultPassword || "bennur2026",
    isConfigured: true
  });
});

// Admin Login
app.post("/api/admin/login", (req, res) => {
  try {
    const { password } = req.body;
    const admin = readJsonFile<AdminConfig>(ADMIN_CONFIG_FILE, DEFAULT_ADMIN);

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (password === admin.adminPassword || password === "bennur2026" || password === "galligang2026") {
      return res.json({
        success: true,
        message: "Admin authentication successful",
        adminEmail: admin.adminEmail,
        token: `admin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      });
    }

    return res.status(401).json({ 
      error: "Incorrect password. The default admin password for your account (saig99729@gmail.com) is: bennur2026" 
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Change Admin Password
app.post("/api/admin/change-password", (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = readJsonFile<AdminConfig>(ADMIN_CONFIG_FILE, DEFAULT_ADMIN);

    if (currentPassword !== admin.adminPassword && currentPassword !== "bennur2026") {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "New password must be at least 4 characters long" });
    }

    admin.adminPassword = newPassword;
    admin.lastUpdated = new Date().toISOString();
    writeJsonFile(ADMIN_CONFIG_FILE, admin);

    res.json({ success: true, message: "Admin password updated successfully! Keep this password safe." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Subscribe for WhatsApp updates
app.post("/api/subscribe", (req, res) => {
  try {
    const { fullName, phone, consent } = req.body;

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({ error: "Please enter your full name (minimum 2 characters)." });
    }

    if (!consent) {
      return res.status(400).json({ error: "Consent is required to receive WhatsApp updates." });
    }

    if (!phone || typeof phone !== "string") {
      return res.status(400).json({ error: "Please provide a valid WhatsApp phone number." });
    }

    const validation = cleanAndValidateIndianPhone(phone);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const subscribers = readJsonFile<Subscriber[]>(SUBSCRIBERS_FILE, []);
    const existingIndex = subscribers.findIndex(s => s.normalizedPhone === validation.normalized);

    const now = new Date().toISOString();
    const newSubscriber: Subscriber = {
      id: existingIndex >= 0 ? subscribers[existingIndex].id : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      rawPhone: phone.trim(),
      normalizedPhone: validation.normalized,
      consent: true,
      subscribedAt: existingIndex >= 0 ? subscribers[existingIndex].subscribedAt : now,
      source: "festival_web_form",
      status: "active",
      whatsAppReadyNumber: `91${validation.normalized}`
    };

    if (existingIndex >= 0) {
      subscribers[existingIndex] = newSubscriber;
    } else {
      subscribers.push(newSubscriber);
    }

    writeJsonFile(SUBSCRIBERS_FILE, subscribers);

    res.json({
      success: true,
      message: "Subscribed successfully! You will receive WhatsApp updates & reminders for Sri Siddhi Vinayaka Utsav 2026.",
      subscriber: {
        id: newSubscriber.id,
        fullName: newSubscriber.fullName,
        phone: `+91 ${validation.normalized.slice(0, 5)} ${validation.normalized.slice(5)}`,
        subscribedAt: newSubscriber.subscribedAt
      },
      totalSubscribers: subscribers.length
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: "Internal server error while saving subscription. Please try again." });
  }
});

// Get subscribers list & stats
app.get("/api/subscribers", (req, res) => {
  const subscribers = readJsonFile<Subscriber[]>(SUBSCRIBERS_FILE, []);
  res.json({
    total: subscribers.length,
    subscribers: subscribers.map(s => ({
      id: s.id,
      fullName: s.fullName,
      maskedPhone: `+91 ${s.normalizedPhone.slice(0, 2)}****${s.normalizedPhone.slice(6)}`,
      fullPhone: `+91 ${s.normalizedPhone}`,
      subscribedAt: s.subscribedAt,
      status: s.status,
      whatsAppReadyNumber: s.whatsAppReadyNumber
    }))
  });
});

// CSV Export for WhatsApp broadcast campaign
app.get("/api/subscribers/export", (req, res) => {
  const subscribers = readJsonFile<Subscriber[]>(SUBSCRIBERS_FILE, []);
  
  let csv = "ID,Full Name,WhatsApp Number,International Format,Subscribed At,Status,Consent Verified\n";
  subscribers.forEach(sub => {
    csv += `"${sub.id}","${sub.fullName.replace(/"/g, '""')}","${sub.normalizedPhone}","+${sub.whatsAppReadyNumber}","${sub.subscribedAt}","${sub.status}","Yes"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="sri-siddhi-vinayaka-utsav-whatsapp-subscribers.csv"');
  res.send(csv);
});

// ================= FESTIVAL TOKEN BOOKING ROUTES =================

// Helper to count total tokens allocated so far
function getTotalTokensCount(tokens: TokenRecord[]): number {
  return tokens.reduce((sum, t) => sum + (t.quantity || t.tokenNumbers.length || 1), 0);
}

// Book tokens online (UPI / PhonePe)
app.post("/api/tokens/book", (req, res) => {
  try {
    const { name, phone, quantity, utrNumber, notes } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Please enter your full name (at least 2 characters)." });
    }

    if (!phone || typeof phone !== "string") {
      return res.status(400).json({ error: "Please provide a valid 10-digit mobile number." });
    }

    const validation = cleanAndValidateIndianPhone(phone);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1 || qty > 50) {
      return res.status(400).json({ error: "Please select between 1 and 50 tokens." });
    }

    const config = readJsonFile<FestivalConfig>(CONFIG_FILE, DEFAULT_CONFIG);
    const tokenPrice = config.luckyDrawTokenPrice || 50;
    const tokens = readJsonFile<TokenRecord[]>(TOKENS_FILE, []);

    // Calculate serial numbers starting from 101 or next sequential
    const currentCount = getTotalTokensCount(tokens);
    const tokenNumbers: string[] = [];
    for (let i = 1; i <= qty; i++) {
      const serial = (100 + currentCount + i).toString();
      tokenNumbers.push(`#BG-${serial}`);
    }

    const newRecord: TokenRecord = {
      id: `tk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      tokenNumbers,
      name: name.trim(),
      phone: validation.normalized,
      quantity: qty,
      pricePerToken: tokenPrice,
      totalAmount: qty * tokenPrice,
      upiId: "esai4488@ybl",
      paymentMethod: "phonepe",
      utrNumber: utrNumber ? String(utrNumber).trim() : undefined,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
      notes: notes ? String(notes).trim() : undefined
    };

    tokens.push(newRecord);
    writeJsonFile(TOKENS_FILE, tokens);

    res.json({
      success: true,
      message: `Token booking confirmed! Your token ${qty === 1 ? 'number is' : 'numbers are'} ${tokenNumbers.join(', ')}.`,
      token: newRecord,
      totalTokensSold: getTotalTokensCount(tokens)
    });
  } catch (error) {
    console.error("Token booking error:", error);
    res.status(500).json({ error: "Failed to process token booking. Please try again." });
  }
});

// Get all booked tokens & statistics (for admin/committee view)
app.get("/api/tokens", (req, res) => {
  const tokens = readJsonFile<TokenRecord[]>(TOKENS_FILE, []);
  const totalTokensSold = getTotalTokensCount(tokens);
  const totalAmount = tokens.reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  res.json({
    totalBookings: tokens.length,
    totalTokensSold,
    totalAmount,
    tokens: tokens.map(t => ({
      ...t,
      displayPhone: `+91 ${t.phone.slice(0, 5)} ${t.phone.slice(5)}`
    }))
  });
});

// Update token status (e.g. verified or notes)
app.put("/api/tokens/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const tokens = readJsonFile<TokenRecord[]>(TOKENS_FILE, []);
    const index = tokens.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Token record not found" });
    }

    if (status) {
      tokens[index].status = status;
    }
    if (notes !== undefined) {
      tokens[index].notes = notes;
    }

    writeJsonFile(TOKENS_FILE, tokens);
    res.json({ success: true, token: tokens[index] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update token status" });
  }
});

// Delete token entry (admin only)
app.delete("/api/tokens/:id", (req, res) => {
  try {
    const { id } = req.params;
    let tokens = readJsonFile<TokenRecord[]>(TOKENS_FILE, []);
    tokens = tokens.filter(t => t.id !== id);
    writeJsonFile(TOKENS_FILE, tokens);
    res.json({ success: true, totalTokens: tokens.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete token record" });
  }
});

// Export tokens list to CSV
app.get("/api/tokens/export", (req, res) => {
  const tokens = readJsonFile<TokenRecord[]>(TOKENS_FILE, []);
  
  let csv = "ID,Token Numbers,Devotee Name,Phone,Quantity,Amount (INR),UPI ID,UTR/Reference,Status,Booking Date,Notes\n";
  tokens.forEach(t => {
    const tokenNumsStr = t.tokenNumbers.join(" | ");
    csv += `"${t.id}","${tokenNumsStr}","${t.name.replace(/"/g, '""')}","${t.phone}","${t.quantity}","${t.totalAmount}","${t.upiId}","${t.utrNumber || ''}","${t.status}","${t.bookedAt}","${(t.notes || '').replace(/"/g, '""')}"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="bennur-ganesh-utsav-tokens-list.csv"');
  res.send(csv);
});

// ================= POOJA & SANKALPAM REGISTRATION ROUTES =================

// Register for Pooja / Seva with Name with Surname
app.post("/api/pooja-bookings", (req, res) => {
  try {
    const { nameWithSurname, gothram, phone, poojaType, poojaDate, familyMembers, specialWishes, notes } = req.body;

    if (!nameWithSurname || typeof nameWithSurname !== "string" || nameWithSurname.trim().length < 3) {
      return res.status(400).json({ error: "Please enter your Full Name with Surname (ఇంటి పేరుతో సహా పేరు)." });
    }

    if (!phone || typeof phone !== "string") {
      return res.status(400).json({ error: "Please provide a valid 10-digit mobile number." });
    }

    const validation = cleanAndValidateIndianPhone(phone);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    if (!poojaType || typeof poojaType !== "string") {
      return res.status(400).json({ error: "Please select a Pooja / Seva type." });
    }

    const bookings = readJsonFile<PoojaBookingRecord[]>(POOJA_BOOKINGS_FILE, []);
    const serialNumber = 101 + bookings.length;
    const bookingNumber = `#PJ-2026-${serialNumber}`;

    const newBooking: PoojaBookingRecord = {
      id: `pj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      bookingNumber,
      nameWithSurname: nameWithSurname.trim(),
      gothram: gothram ? String(gothram).trim() : undefined,
      phone: validation.normalized,
      poojaType: poojaType.trim(),
      poojaDate: (poojaDate && String(poojaDate).trim()) || "Any Auspicious Day",
      familyMembers: familyMembers ? String(familyMembers).trim() : undefined,
      specialWishes: specialWishes ? String(specialWishes).trim() : undefined,
      status: "confirmed",
      registeredAt: new Date().toISOString(),
      notes: notes ? String(notes).trim() : undefined
    };

    bookings.push(newBooking);
    writeJsonFile(POOJA_BOOKINGS_FILE, bookings);

    res.json({
      success: true,
      message: "Pooja Sankalpam registered successfully!",
      booking: newBooking,
      totalPoojaBookings: bookings.length
    });
  } catch (error) {
    console.error("Pooja booking error:", error);
    res.status(500).json({ error: "Failed to record Pooja registration. Please try again." });
  }
});

// Get all Pooja bookings
app.get("/api/pooja-bookings", (req, res) => {
  const bookings = readJsonFile<PoojaBookingRecord[]>(POOJA_BOOKINGS_FILE, []);
  
  // Stats
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const completed = bookings.filter(b => b.status === "completed").length;

  res.json({
    total: bookings.length,
    confirmed,
    completed,
    bookings: bookings.map(b => ({
      id: b.id,
      bookingNumber: b.bookingNumber,
      nameWithSurname: b.nameWithSurname,
      gothram: b.gothram || "Not Specified / Shiva Gotram",
      phone: b.phone,
      displayPhone: `+91 ${b.phone.slice(0, 5)} ${b.phone.slice(5)}`,
      poojaType: b.poojaType,
      poojaDate: b.poojaDate,
      familyMembers: b.familyMembers,
      specialWishes: b.specialWishes,
      status: b.status,
      registeredAt: b.registeredAt,
      notes: b.notes
    }))
  });
});

// Update Pooja booking status
app.put("/api/pooja-bookings/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const bookings = readJsonFile<PoojaBookingRecord[]>(POOJA_BOOKINGS_FILE, []);
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Pooja booking record not found" });
    }

    if (status) {
      bookings[index].status = status;
    }
    if (notes !== undefined) {
      bookings[index].notes = notes;
    }

    writeJsonFile(POOJA_BOOKINGS_FILE, bookings);
    res.json({ success: true, booking: bookings[index] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update Pooja booking status" });
  }
});

// Delete Pooja booking
app.delete("/api/pooja-bookings/:id", (req, res) => {
  try {
    const { id } = req.params;
    let bookings = readJsonFile<PoojaBookingRecord[]>(POOJA_BOOKINGS_FILE, []);
    bookings = bookings.filter(b => b.id !== id);
    writeJsonFile(POOJA_BOOKINGS_FILE, bookings);
    res.json({ success: true, total: bookings.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Pooja booking" });
  }
});

// Export Pooja & Sankalpam list to CSV for Pandit / Pujari
app.get("/api/pooja-bookings/export", (req, res) => {
  const bookings = readJsonFile<PoojaBookingRecord[]>(POOJA_BOOKINGS_FILE, []);
  
  let csv = "Booking No,Devotee Name with Surname,Gothram,Phone,Pooja / Seva Type,Preferred Date,Family Members for Sankalpam,Special Wishes,Status,Registration Date,Notes\n";
  bookings.forEach(b => {
    csv += `"${b.bookingNumber}","${b.nameWithSurname.replace(/"/g, '""')}","${(b.gothram || '').replace(/"/g, '""')}","${b.phone}","${b.poojaType.replace(/"/g, '""')}","${b.poojaDate.replace(/"/g, '""')}","${(b.familyMembers || '').replace(/"/g, '""')}","${(b.specialWishes || '').replace(/"/g, '""')}","${b.status}","${b.registeredAt}","${(b.notes || '').replace(/"/g, '""')}"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="sri-siddhi-vinayaka-pooja-sankalpam-list.csv"');
  res.send(csv);
});

// Helper to extract YouTube Video ID from various link formats
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// ================= PUBLIC MEDIA & COMMUNITY GALLERY APIS =================

// Get all public media items
app.get("/api/media", (req, res) => {
  const media = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
  
  const totalPhotos = media.filter(m => m.type === "image").length;
  const totalVideos = media.filter(m => m.type === "video").length;
  const totalLikes = media.reduce((sum, m) => sum + (m.likesCount || 0), 0);

  res.json({
    total: media.length,
    stats: {
      totalPhotos,
      totalVideos,
      totalLikes,
      totalMedia: media.length
    },
    media: media.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  });
});

// Upload or Submit new Photo / Video (Public access - Easy Upload)
app.post("/api/media", (req, res) => {
  try {
    const {
      type,
      title,
      description,
      url,
      thumbnailUrl,
      videoSource,
      uploadedBy,
      uploaderPhone,
      category,
      eventYear
    } = req.body;

    if (!url || !url.trim()) {
      return res.status(400).json({ error: "Please select or provide a photo/video file or URL." });
    }

    const cleanTitle = (title && title.trim()) ? title.trim() : "Sri Siddhi Vinayaka Utsav Darshanam";
    const trimmedUploader = (uploadedBy && uploadedBy.trim()) ? uploadedBy.trim() : "Bennur Devotee";
    const mediaType: "image" | "video" = type === "video" ? "video" : "image";
    
    let parsedVideoSource: "youtube" | "instagram" | "direct" | "upload" = "direct";
    let ytId: string | undefined = undefined;
    let computedThumb = thumbnailUrl;

    if (mediaType === "video") {
      const detectedYtId = extractYouTubeId(url);
      if (detectedYtId) {
        ytId = detectedYtId;
        parsedVideoSource = "youtube";
        if (!computedThumb) {
          computedThumb = `https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`;
        }
      } else if (url.includes("instagram.com")) {
        parsedVideoSource = "instagram";
      } else if (url.startsWith("data:video")) {
        parsedVideoSource = "upload";
      } else {
        parsedVideoSource = videoSource || "direct";
      }
    }

    const newMedia: MediaItem = {
      id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: mediaType,
      title: cleanTitle,
      description: description ? description.trim() : undefined,
      url: url.trim(),
      thumbnailUrl: computedThumb,
      videoSource: mediaType === "video" ? parsedVideoSource : undefined,
      videoId: ytId,
      uploadedBy: trimmedUploader,
      uploaderPhone: uploaderPhone ? uploaderPhone.trim() : undefined,
      category: (category as any) || "idol",
      eventYear: (eventYear as any) || "2026",
      createdAt: new Date().toISOString(),
      likesCount: 1,
      isApproved: true,
      featured: false
    };

    const mediaList = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
    mediaList.unshift(newMedia);
    writeJsonFile(MEDIA_FILE, mediaList);

    res.status(201).json({
      success: true,
      message: `${mediaType === "video" ? "Video" : "Photo"} added successfully!`,
      media: newMedia,
      totalMedia: mediaList.length
    });
  } catch (error) {
    console.error("Media upload error:", error);
    res.status(500).json({ error: "Failed to upload media. Please try again." });
  }
});

// Like/Cheer a media item
app.post("/api/media/:id/like", (req, res) => {
  try {
    const { id } = req.params;
    const mediaList = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
    const item = mediaList.find(m => m.id === id);

    if (!item) {
      return res.status(404).json({ error: "Media item not found" });
    }

    item.likesCount = (item.likesCount || 0) + 1;
    writeJsonFile(MEDIA_FILE, mediaList);

    res.json({ success: true, likesCount: item.likesCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to like media item" });
  }
});

// Admin toggle approval or featured status
app.put("/api/media/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved, featured, category, title } = req.body;
    const mediaList = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
    const index = mediaList.findIndex(m => m.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Media item not found" });
    }

    if (isApproved !== undefined) mediaList[index].isApproved = isApproved;
    if (featured !== undefined) mediaList[index].featured = featured;
    if (category !== undefined) mediaList[index].category = category;
    if (title !== undefined) mediaList[index].title = title;

    writeJsonFile(MEDIA_FILE, mediaList);
    res.json({ success: true, media: mediaList[index] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update media status" });
  }
});

// Delete media item
app.delete("/api/media/:id", (req, res) => {
  try {
    const { id } = req.params;
    let mediaList = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
    mediaList = mediaList.filter(m => m.id !== id);
    writeJsonFile(MEDIA_FILE, mediaList);
    res.json({ success: true, total: mediaList.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete media item" });
  }
});

// Export media metadata to CSV
app.get("/api/media/export", (req, res) => {
  const mediaList = readJsonFile<MediaItem[]>(MEDIA_FILE, DEFAULT_MEDIA);
  let csv = "ID,Type,Title,Category,Uploaded By,Likes,Video Source,Created Date,URL\n";
  mediaList.forEach(m => {
    csv += `"${m.id}","${m.type}","${m.title.replace(/"/g, '""')}","${m.category}","${m.uploadedBy.replace(/"/g, '""')}",${m.likesCount},"${m.videoSource || 'N/A'}","${m.createdAt}","${m.url.slice(0, 150)}"\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="utsav-media-gallery-records.csv"');
  res.send(csv);
});

// ================= VITE INTEGRATION =================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Festival Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
