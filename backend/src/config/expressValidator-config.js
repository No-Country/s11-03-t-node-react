import { body, validationResult } from 'express-validator';

export const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = {};

    errors.array().forEach((error) => {
      const fieldName = error.path;
      let errorMessage = error.msg;

      if (!errorMessages[fieldName]) {
        errorMessages[fieldName] = [];
      }

      errorMessages[fieldName].push(errorMessage);
    });

    const groupedErrors = Object.keys(errorMessages).reduce((acc, key) => {
      acc[key] = errorMessages[key];
      return acc;
    }, {});

    return res.status(400).json({
      status: 'fail',
      errors: groupedErrors,
    });
  }

  next();
};

// Función para generar reglas de validación dinámica.
export const generateValidationRules = (entityName, fields) => {
  const validationRules = [];

  for (const fieldName in fields) {
    if (Object.hasOwnProperty.call(fields, fieldName)) {
      const fieldConfig = fields[fieldName];

      const fieldValidationRules = Object.entries(fieldConfig).map(([ruleName, ruleOptions]) => {
        const { validator, errorMessage } = validationConfig[ruleName];
        return validator(fieldName, ruleOptions).withMessage(errorMessage(fieldName, ruleOptions));
      });

      validationRules.push(...fieldValidationRules);
    }
  }

  validationRules.push(validFields);

  return validationRules;
};

export const validationConfig = {
  //Reglas Nativas de Express
  notEmpty: {
    validator: (fieldName) => body(fieldName).notEmpty(),
    errorMessage: (fieldName) => `El campo ${fieldName} es obligatorio`,
  },
  isLength: {
    validator: (fieldName, options) => body(fieldName).isLength(options),
    errorMessage: (fieldName, options) =>
      `El campo ${fieldName} debe tener entre ${options.min} y ${options.max} caracteres`,
  },
  isEmail: {
    validator: (fieldName) => body(fieldName).isEmail(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser una dirección de correo válida`,
  },
  isURL: {
    validator: (fieldName) => body(fieldName).isURL(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser una URL válida.`,
  },
  isNumeric: {
    validator: (fieldName) => body(fieldName).isNumeric(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser un número`,
  },
  isInt: {
    validator: (fieldName) => body(fieldName).isInt(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser un número entero`,
  },
  isFloat: {
    validator: (fieldName) => body(fieldName).isFloat(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser un número decimal`,
  },
  isBoolean: {
    validator: (fieldName) => body(fieldName).isBoolean(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser un valor booleano (true o false)`,
  },
  isDate: {
    validator: (fieldName) => body(fieldName).isISO8601(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser una fecha válida`,
  },
  isAfter: {
    validator: (fieldName, date) => body(fieldName).isAfter(date),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser una fecha posterior a la fecha proporcionada`,
  },
  isBefore: {
    validator: (fieldName, date) => body(fieldName).isBefore(date),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser una fecha anterior a la fecha proporcionada`,
  },
  isMongoId: {
    validator: (fieldName) => body(fieldName).isMongoId(),
    errorMessage: (fieldName) => `El campo ${fieldName} debe ser un ObjectId válido de MongoDB.`,
  },

  // Agrega más reglas de validación nativas aquí...

  //Reglas Personalizadas

  notEmptyFile: {
    validator: (fieldName) =>
      body(fieldName).custom((value, { req }) => {
        if (!req.file) {
          throw new Error(`El campo ${fieldName} es obligatorio.`);
        }
        return true;
      }),
    errorMessage: (fieldName) => `El campo ${fieldName} es obligatorio.`,
  },
  isImage: {
    validator: (fieldName) =>
      body(fieldName).custom((value, { req }) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (req.file) {
          if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new Error(`El archivo en el campo ${fieldName} debe ser una imagen (JPEG o PNG).`);
          }
        }
        return true;
      }),
    errorMessage: (fieldName) => `El archivo en el campo ${fieldName} debe ser una imagen (JPEG o PNG).`,
  },

  password: {
    validator: (fieldName) =>
      body(fieldName).custom((value) => {
        // Define los caracteres especiales permitidos
        const specialChars = '!#$%&()*+/-?@[]^_{|}';

        // Define las reglas de validación personalizadas aquí
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = [...specialChars].some((char) => value.includes(char));

        if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
          throw new Error(
            `El campo ${fieldName} debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial`,
          );
        }

        return true;
      }),
    errorMessage: (fieldName) =>
      `El campo ${fieldName} debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial`,
  },

  OnlyLetters: {
    validator: (fieldName) =>
      body(fieldName).custom((value) => {
        // Define la expresión regular para validar nombres que solo contienen letras y espacios
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s-.]+$/;

        if (!regex.test(value)) {
          throw new Error(`El campo ${fieldName} debe contener solo letras, espacios o guiones.`);
        }

        return true;
      }),
    errorMessage: (fieldName) => `El campo ${fieldName} debe contener solo letras, espacios o guiones.`,
  },

  // Agrega más reglas de validación personalizadas aquí...
};
