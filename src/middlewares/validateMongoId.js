import mongoose from 'mongoose';

export const validateMongoId = (idName) => (req, res, next) => {
  const id = req.params[idName];

  if (!id) {
    throw new Error('id in validateMongoId is not provided');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: `${id} is not valid`,
    });
  }

  return next();
};
