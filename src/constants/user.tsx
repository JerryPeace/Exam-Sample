export enum UserFieldKey {
  id = 'id',
  first_name = 'first_name',
  last_name = 'last_name',
  job = 'job',
  description = 'description',
}

export interface UserFieldConfigItem {
  field: UserFieldKey;
  defaultValue: string;
  type: 'text' | 'textarea';
  label: string;
  validation?: any;
}

export type UserFieldConfig = {
  [key: string]: UserFieldConfigItem;
};

export const userFieldConfig: UserFieldConfig = {
  [UserFieldKey.first_name]: {
    field: UserFieldKey.first_name,
    type: 'text',
    label: 'First Name',
    defaultValue: '',
    validation: {
      required: 'First Name is required',
      maxLength: {
        value: 20,
        message: 'Username cannot exceed 20 characters',
      },
    },
  },
  [UserFieldKey.last_name]: {
    field: UserFieldKey.last_name,
    type: 'text',
    label: 'Last Name',
    defaultValue: '',
    validation: {
      required: 'Last Name is required',
      maxLength: {
        value: 20,
        message: 'Username cannot exceed 20 characters',
      },
    },
  },
  [UserFieldKey.job]: {
    field: UserFieldKey.job,
    type: 'text',
    label: 'Job',
    defaultValue: '',
    validation: {
      required: 'Job is required',
      maxLength: {
        value: 50,
        message: 'Job cannot exceed 50 characters',
      },
    },
  },
  [UserFieldKey.description]: {
    field: UserFieldKey.description,
    type: 'textarea',
    label: 'Description',
    defaultValue: '',
    validation: {
      maxLength: {
        value: 256,
        message: 'Job cannot exceed 256 characters',
      },
    },
  },
};

export const userColumnNameMap = {
  [UserFieldKey.first_name]: 'First Name',
  [UserFieldKey.last_name]: 'Last Name',
  [UserFieldKey.job]: 'Address',
  [UserFieldKey.description]: 'description',
} as const;

export interface UserDataType {
  [UserFieldKey.id]: number;
  [UserFieldKey.first_name]: string;
  [UserFieldKey.last_name]: string;
  [UserFieldKey.job]: string;
  [UserFieldKey.description]: string;
  [key: string]: any;
}
// user initialState
export const initialState: UserDataType = {
  [UserFieldKey.id]: 0,
  [UserFieldKey.first_name]: '',
  [UserFieldKey.last_name]: '',
  [UserFieldKey.job]: '',
  [UserFieldKey.description]: '',
};
