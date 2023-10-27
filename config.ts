export const NODE_ENV = process.env.NODE_ENV;
export const PROFILE = process.env.AWS_PROFILE || '';
export const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/neptune';
export const NEXT_CLIENT_API_PATH = process.env.NEXT_CLIENT_API_PATH || 'http://localhost:3000/api';

export const config = {
  NEXT_CLIENT_API_PATH,
  NEXT_PUBLIC_BASE_PATH,
  PROFILE,
  NODE_ENV,
};

export default config;
