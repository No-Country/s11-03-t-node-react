import { generateValidationRules } from '../config/expressValidator-config';

// Ejemplos de cómo definir reglas de validación específicas, que se usan en las rutas
export const uploadImageValidation = generateValidationRules('UploadImage', {
  image: {
    notEmptyFile: {},
    isImage: {},
  },
});

export const updatePasswordValidation = generateValidationRules('updatePasswordClient', {
  newPassword: {
    notEmpty: {},
    isLength: { min: 8, max: 12 },
    password: {},
  },
});

export const updateClientValidation = generateValidationRules('updateClient', {
  fullname: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  phone: {
    notEmpty: {},
    isLength: { min: 1, max: 15 },
  },
  address: {
    notEmpty: {},
  },
  photo_url: {
    notEmpty: {},
    isURL: {},
  },
});

export const registerClientValidation = generateValidationRules('registerClient', {
  fullname: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  email: {
    notEmpty: {},
    isEmail: {},
  },
  password: {
    notEmpty: {},
    isLength: { min: 8, max: 12 },
    password: {},
  },
});

export const loginClientValidation = generateValidationRules('loginClient', {
  email: {
    notEmpty: {},
    isEmail: {},
  },
  password: {
    notEmpty: {},
  },
});

export const createAppointmentValidation = generateValidationRules('createAppointment', {
  date: {
    notEmpty: {},
    isDate: {},
  },
  reason: {
    notEmpty: {},
    isLength: { min: 0, max: 255 },
  },
  start_time: {
    notEmpty: {},
    isDate: {},
  },
  end_time: {
    notEmpty: {},
    isDate: {},
  },
  notes: {
    notEmpty: {},
    isLength: { min: 0, max: 255 },
  },
  petId: {
    notEmpty: {},
    isMongoId: {},
  },
  veterinarianId: {
    notEmpty: {},
    isMongoId: {},
  },
});

export const updateAppointmentValidation = generateValidationRules('updateAppointment', {
  date: {
    isDate: {},
  },
  reason: {
    notEmpty: {},
    isLength: { min: 0, max: 255 },
  },
  notes: {
    notEmpty: {},
    isLength: { min: 0, max: 255 },
  },
});

export const createVeterinarianValidation = generateValidationRules('createVeterinarian', {
  fullname: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  speciality: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  phone: {
    notEmpty: {},
    isLength: { min: 1, max: 15 },
  },
  license: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
  },
});

export const updateVeterinarianValidation = generateValidationRules('updateVeterinarian', {
  fullname: {
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  speciality: {
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  phone: {
    isLength: { min: 1, max: 15 },
  },
  license: {
    isLength: { min: 5, max: 40 },
  },
  photo_url: {
    isURL: {},
  },
});

export const createPetValidation = generateValidationRules('createPet', {
  name: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  specie: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  sex: {
    notEmpty: {},
    isLength: { min: 8, max: 9 },
    OnlyLetters: {},
  },
  age: {
    notEmpty: {},
    isLength: { min: 1, max: 2 },
    isFloat: {},
  },
  photo_url: {
    isURL: {},
  },
  clientId: {
    notEmpty: {},
    isMongoId: {},
  },
});

export const updatePetValidation = generateValidationRules('updatePet', {
  name: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  specie: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  sex: {
    notEmpty: {},
    isLength: { min: 8, max: 9 },
    OnlyLetters: {},
  },
  age: {
    notEmpty: {},
    isLength: { min: 1, max: 2 },
    isFloat: {},
  },
  photo_url: {
    isURL: {},
  },
  clientId: {
    notEmpty: {},
    isMongoId: {},
  },
});

export const sendMailValidation = generateValidationRules('sendMail', {
  fullname: {
    notEmpty: {},
    isLength: { min: 5, max: 40 },
    OnlyLetters: {},
  },
  email: {
    notEmpty: {},
    isEmail: {},
  },
  message: {
    notEmpty: {},
    isLength: { min: 10, max: 255 },
  },
});
