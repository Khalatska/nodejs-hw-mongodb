import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/contacts.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
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

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ userId: userId, ...payload });

  return contact;
};

export const updateContact = async (contactId, payload) => {
  const result = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });

  return result;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId });

  return contact;
};
