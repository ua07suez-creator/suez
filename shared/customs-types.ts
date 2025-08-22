// أنواع البيانات لنظام إدارة التخليص الجمركي

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  user_type: 'client' | 'admin' | 'employee' | 'accountant' | 'support';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  user_id: number;
  company_name?: string;
  company_type: 'individual' | 'company';
  tax_number?: string;
  commercial_register?: string;
  address?: string;
  city?: string;
  country: string;
  contact_person?: string;
  contact_phone?: string;
  contact_email?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Case {
  id: number;
  case_number: string;
  client_id: number;
  assigned_employee_id?: number;
  operation_type: 'import' | 'export';
  port: string;
  bill_of_lading?: string;
  shipment_number?: string;
  shipping_company?: string;
  goods_description?: string;
  goods_value?: number;
  currency: string;
  current_status: string;
  target_completion_date?: string;
  actual_completion_date?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CaseStatusHistory {
  id: number;
  case_id: number;
  status: string;
  status_date: string;
  notes?: string;
  created_by?: number;
  created_at: string;
}

export interface Document {
  id: number;
  case_id: number;
  document_name: string;
  document_type: string;
  file_path?: string;
  file_size?: number;
  mime_type?: string;
  uploaded_by?: number;
  upload_date: string;
  is_required: boolean;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  case_id: number;
  client_id: number;
  total_amount: number;
  currency: string;
  tax_amount: number;
  discount_amount: number;
  payment_status: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  payment_date?: string;
  payment_method?: string;
  notes?: string;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Message {
  id: number;
  case_id: number;
  sender_id: number;
  receiver_id?: number;
  message_type: 'general' | 'urgent' | 'document_request' | 'payment_reminder';
  subject?: string;
  message: string;
  attachment_path?: string;
  is_read: boolean;
  sent_at: string;
  read_at?: string;
}

export interface Notification {
  id: number;
  user_id: number;
  notification_type: string;
  title: string;
  message: string;
  case_id?: number;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

export interface SupportTicket {
  id: number;
  ticket_number: string;
  user_id: number;
  subject: string;
  description: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: number;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

// أنواع البيانات للأجوبة من API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  client?: Client;
  token?: string;
  message?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  company_name?: string;
  company_type: 'individual' | 'company';
  tax_number?: string;
  commercial_register?: string;
  address?: string;
  city?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface DashboardStats {
  total_cases: number;
  active_cases: number;
  completed_cases: number;
  pending_documents: number;
  pending_payments: number;
  overdue_invoices: number;
}

export interface CaseWithDetails extends Case {
  client?: Client;
  assigned_employee?: User;
  status_history?: CaseStatusHistory[];
  documents?: Document[];
  invoices?: Invoice[];
  messages?: Message[];
}
