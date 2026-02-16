export interface Signature {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  message?: string;
  created_at: string;
}

export interface SignatureFormData {
  first_name: string;
  last_name: string;
  email: string;
  message?: string;
}
