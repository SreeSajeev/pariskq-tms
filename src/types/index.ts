// Pariskq TMS — Type Definitions (from DATABASE_SCHEMA.md)

// === ENUMS ===
export type SubscriptionTier = 'TRIAL' | 'STARTER' | 'GROWTH' | 'BUSINESS' | 'ENTERPRISE';
export type SubscriptionStatus = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'SUSPENDED' | 'CANCELLED';
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'OPERATIONS' | 'DRIVER_MANAGER' | 'FINANCE' | 'CLIENT' | 'DRIVER';
export type UserStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type VehicleType = 'TRUCK' | 'MINI_TRUCK' | 'TEMPO' | 'TRAILER' | 'VAN' | 'TANKER' | 'FLATBED' | 'REFRIGERATED' | 'OTHER';
export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'IN_MAINTENANCE' | 'RETIRED';
export type FuelType = 'DIESEL' | 'PETROL' | 'CNG' | 'ELECTRIC' | 'HYBRID';
export type DriverStatus = 'AVAILABLE' | 'ON_TRIP' | 'ON_LEAVE' | 'INACTIVE';
export type EmploymentType = 'FULL_TIME' | 'CONTRACT' | 'OUTSOURCED';
export type GoodsType = 'GENERAL' | 'FRAGILE' | 'HAZARDOUS' | 'PERISHABLE' | 'OVERSIZED' | 'VALUABLE';
export type ShipmentStatus = 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'REACHED' | 'DELIVERED' | 'CANCELLED' | 'DISPUTED';
export type TripStatus = 'SCHEDULED' | 'IN_TRANSIT' | 'REACHED' | 'DELIVERED' | 'CANCELLED' | 'FAILED';
export type BillingRateType = 'PER_KM' | 'PER_TONNE' | 'PER_TONNE_PER_KM' | 'PER_TRIP' | 'PER_DAY';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'DISPUTED' | 'CANCELLED';
export type DocumentType = 'RC' | 'INSURANCE' | 'NATIONAL_PERMIT' | 'STATE_PERMIT' | 'PUC' | 'FITNESS' | 'ROAD_TAX' | 'DRIVING_LICENCE' | 'MEDICAL_CERTIFICATE' | 'POLICE_VERIFICATION' | 'WAYBILL' | 'INVOICE_DOC' | 'POD_PHOTO' | 'POD_SIGNATURE' | 'OTHER';
export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';

// === ENTITIES ===
export interface Organisation {
  id: string;
  companyName: string;
  companyType: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country: string;
  gstNumber?: string;
  panNumber?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  timezone: string;
  currency: string;
  defaultBillingRateType?: BillingRateType;
  defaultBillingRateValue?: number;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  orgId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  trialEndsAt?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  maxVehicles: number;
  maxUsers: number;
  monthlyPriceInPaise: number;
  annualPriceInPaise: number;
  isAnnual: boolean;
}

export interface User {
  id: string;
  orgId: string;
  email: string;
  fullName: string;
  mobile?: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  orgId: string;
  registrationNumber: string;
  vehicleType: VehicleType;
  make?: string;
  model?: string;
  year?: number;
  fuelType: FuelType;
  capacityTonnes?: number;
  capacityVolumeCbm?: number;
  status: VehicleStatus;
  gpsDeviceId?: string;
  lastKnownLat?: number;
  lastKnownLng?: number;
  lastGpsPingAt?: string;
  currentDriverId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleDocument {
  id: string;
  vehicleId: string;
  orgId: string;
  documentType: DocumentType;
  documentNumber?: string;
  issuedAt?: string;
  expiresAt?: string;
  fileUrl?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  orgId: string;
  fullName: string;
  mobile: string;
  email?: string;
  licenceNumber: string;
  licenceType: string;
  licenceExpiresAt?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  employmentType: EmploymentType;
  status: DriverStatus;
  avatarUrl?: string;
  safetyScore?: number;
  totalTrips?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  orgId: string;
  companyName: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstNumber?: string;
  billingRateType?: BillingRateType;
  billingRateValue?: number;
  portalEnabled: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;
  orgId: string;
  referenceNumber: string;
  customerId: string;
  customer?: Customer;
  pickupAddress: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupDate: string;
  pickupTimeFrom?: string;
  pickupTimeTo?: string;
  deliveryAddress: string;
  deliveryLat?: number;
  deliveryLng?: number;
  expectedDeliveryDate: string;
  goodsType: GoodsType;
  goodsDescription?: string;
  quantity?: number;
  weightKg?: number;
  volumeCbm?: number;
  specialInstructions?: string;
  status: ShipmentStatus;
  billingRateType?: BillingRateType;
  billingRateValue?: number;
  loadingCharges?: number;
  fuelSurchargePercent?: number;
  estimatedDistanceKm?: number;
  estimatedTripValue?: number;
  tripId?: string;
  trip?: Trip;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  orgId: string;
  shipmentId: string;
  vehicleId: string;
  driverId: string;
  vehicle?: Vehicle;
  driver?: Driver;
  status: TripStatus;
  scheduledStartAt?: string;
  startedAt?: string;
  reachedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  currentLat?: number;
  currentLng?: number;
  currentSpeedKmph?: number;
  lastLocationUpdateAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PodRecord {
  id: string;
  orgId: string;
  tripId: string;
  recipientName?: string;
  recipientDesignation?: string;
  signatureUrl?: string;
  photoUrls: string[];
  notes?: string;
  gpsLat?: number;
  gpsLng?: number;
  submittedAt: string;
}

export interface Invoice {
  id: string;
  orgId: string;
  invoiceNumber: string;
  customerId: string;
  customer?: Customer;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  subtotalPaise: number;
  taxPaise: number;
  totalPaise: number;
  paidPaise: number;
  balancePaise: number;
  notes?: string;
  lineItems: InvoiceLineItem[];
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  shipmentId?: string;
  description: string;
  quantity: number;
  unitPricePaise: number;
  totalPaise: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amountPaise: number;
  paymentDate: string;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  orgId: string;
  userId: string;
  title: string;
  message: string;
  channel: NotificationChannel;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  orgId: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  createdAt: string;
}

export interface TrackingEvent {
  id: string;
  tripId: string;
  lat: number;
  lng: number;
  speedKmph: number;
  heading?: number;
  recordedAt: string;
}

// === API RESPONSE TYPES ===
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

// === DASHBOARD TYPES ===
export interface DashboardKPIs {
  activeShipments: number;
  activeShipmentsTrend: number;
  tripsInTransit: number;
  deliveredToday: number;
  deliveredTodayTrend: number;
  overdueDeliveries: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  entityType: string;
  entityId: string;
  actionUrl: string;
  createdAt: string;
}
