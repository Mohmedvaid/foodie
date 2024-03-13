// src/api/controllers/item.controller.js

import Item from '../models/item';
import CustomError from '../../utils/CustomError';

const createItem = async (req, res, next) => {
  try {
    const { title, description, price, category, cuisine, images } = req.body;
    const cookerId = req.user.id; // Assuming 'req.user' is populated from the auth middleware

    const newItem = new Item({
      title,
      description,
      cooker: cookerId,
      price,
      category,
      cuisine,
      images,
      available: true // Default to available upon creation
    });

    await newItem.save();
    return res.standardResponse(201, true, { item: newItem }, 'Item created successfully');
  } catch (error) {
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const updateData = req.body;
    const cookerId = req.user.id;

    const item = await Item.findOneAndUpdate({ _id: itemId, cooker: cookerId }, updateData, {
      new: true
    });

    if (!item) throw new CustomError('Item not found or user not authorized to update', 404);

    return res.standardResponse(200, true, { item }, 'Item updated successfully');
  } catch (error) {
    return next(error);
  }
};

const listItem = async (req, res, next) => {
  try {
    const items = await Item.find({ available: true }).populate('cooker', 'firstName lastName');
    return res.standardResponse(200, true, { items }, 'Items retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const toggleItemAvailability = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cookerId = req.user.id;

    const item = await Item.findById(itemId);

    if (!item || item.cooker.toString() !== cookerId)
      throw new CustomError('Item not found or user not authorized', 404);

    item.available = !item.available;
    await item.save();

    return res.standardResponse(
      200,
      true,
      { item },
      `Item availability toggled to ${item.available}`
    );
  } catch (error) {
    return next(error);
  }
};

export { createItem, updateItem, listItem, toggleItemAvailability };
