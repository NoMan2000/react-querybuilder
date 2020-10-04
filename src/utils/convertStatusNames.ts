import { StatusNames } from '../../types';

export const boolToText = (value?: StatusNames | boolean): StatusNames => {
  if (typeof value === 'undefined') {
    return 'indeterminate';
  }
  if (typeof value === 'boolean') {
    return value ? 'checked' : 'unchecked';
  }
  return value;
};

export const textToBoolean = (value?: StatusNames | boolean): boolean => {
  if (typeof value === 'undefined') {
    return false;
  }
  if (typeof value === 'string') {
    return value === 'checked';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return value;
};
