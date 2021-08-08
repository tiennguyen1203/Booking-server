import dotenv from 'dotenv';
dotenv.config();

export enum Role {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
export const PAYPAL_PARTNER_MERCHANT_ID =
  process.env.PAYPAL_PARTNER_MERCHANT_ID;
export const PAYPAL_PARTNER_ATTRIBUTION_ID =
  process.env.PAYPAL_PARTNER_ATTRIBUTION_ID;

export const PAYPAL_API_URL =
  process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

export enum PAYMENT_STATUS {
  CREATED = 'CREATED',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
}

export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
