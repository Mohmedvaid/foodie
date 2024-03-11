// src/api/validation/user.js

import { body } from 'express-validator';

const validateUser = (type = 'register') => {
  const rules = [
    body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];

  // Additional validations for registration
  if (type === 'register') {
    rules.push(
      body('firstName').not().isEmpty().trim().escape().withMessage('First name is required'),
      body('lastName').not().isEmpty().trim().escape().withMessage('Last name is required')
    );
  }

  return rules;
};

export default validateUser;
