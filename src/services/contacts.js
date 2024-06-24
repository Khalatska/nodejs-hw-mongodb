import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/contacts.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  activeUserId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavorite) {
    contactQuery.where('isFavorite').equals(filter.isFavorite);
  }

  contactQuery.where('userId').equals(activeUserId);

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId: userId });
  return contact;
};

export const createContact = async ({ file, ...payload }, userId) => {
  const url = await saveFileToCloudinary(file);
  const contact = await Contact.create({
    ...payload,
    userId: userId,
    photo: url,
  });

  return contact;
};

export const updateContact = async (
  contactId,
  { photo, ...payload },
  userId,
) => {
  const url = await saveFileToCloudinary(photo);
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId: userId },
    { ...payload, photo: url },
    { new: true },
  );

  return result;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });

  return contact;
};
