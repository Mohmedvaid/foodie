// src/api/validation/item.validation.js

import { body } from 'express-validator';

const validateItem = () => {
  return [
    body('title').not().isEmpty().withMessage('Title is required').trim().escape(),

    body('description').not().isEmpty().withMessage('Description is required').trim().escape(),

    body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than zero').toFloat(),

    body('category').not().isEmpty().withMessage('Category is required').trim().escape(),

    body('cuisine')
      .isIn(['african', 'chinese', 'indian', 'italian', 'japanese', 'mexican', 'middle eastern'])
      .withMessage('Invalid cuisine type')

    // Placeholder for future image validation
    // You can add image validation here once the setup is ready
    // e.g., body('images').isArray().withMessage('Images should be an array'),

    // You might want to add validations for fields like 'available' if they are expected to be provided during creation
    // If 'available' is always true upon creation and not provided by the user, you may not need to validate it here
  ];
};

export default validateItem;
