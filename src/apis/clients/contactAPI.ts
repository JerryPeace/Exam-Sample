import clientServices from '../clientServices';
import { toast } from 'react-toastify';

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

interface ContactResponse {
  statusCode: string;
  message: string;
  data: Contact;
}

async function getAllContacts(mode: 'general' | 'enhance' = 'enhance'): Promise<Contact[]> {
  return clientServices[mode].get('/contacts').then((result) => result?.data.data || []);
}

async function getSingleContact(
  { id }: { id?: number },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<Contact> {
  if (!id) {
    return Promise.reject('Contact ID is required');
  }
  return clientServices[mode].get(`/contacts/${id}`).then((result) => result.data.data);
}

async function createContact(
  { data }: { data: Contact },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<ContactResponse> {
  return clientServices[mode].post(`/contacts`, data).then((result) => {
    toast('Create a Contact successfully', { type: 'success' });
    return result.data.data;
  });
}

async function updateContact(
  { id, info }: { id: number; info: Contact },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<ContactResponse> {
  return clientServices[mode].patch(`/contacts/${id}`, { info }).then((result) => {
    toast('Update Contact successfully', { type: 'success' });
    return result.data.data;
  });
}

async function removeContact(
  { id }: { id: number },
  mode: 'general' | 'enhance' = 'enhance'
): Promise<ContactResponse> {
  if (!id) {
    return Promise.reject('Contact ID is required');
  }
  return clientServices[mode].delete(`/contacts/${id}`).then((result) => {
    toast('Remove Contact successfully', { type: 'success' });
    return result.data.data;
  });
}

const contactAPI = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  removeContact,
};
export default contactAPI;
