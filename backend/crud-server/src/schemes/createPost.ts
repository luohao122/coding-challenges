import Joi, { ObjectSchema } from "joi";

const createPostSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().min(4).max(50).required().messages({
    "string.base": "Title must be of type string",
    "string.min": "Title must be at least 4 characters",
    "string.max": "Title cannot exceed 50 characters",
    "string.empty": "Title is a required field",
  }),
  slug: Joi.string()
    .min(4)
    .max(40)
    .pattern(/^[a-z0-9-]+$/) // Slug validation: lowercase letters, numbers, and hyphens
    .messages({
      "string.base": "Slug must be of type string",
      "string.min": "Slug must be at least 4 characters",
      "string.max": "Slug cannot exceed 40 characters",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  content: Joi.string().min(4).max(10000).required().messages({
    "string.base": "Content must be of type string",
    "string.min": "Content must be at least 4 characters",
    "string.max": "Content cannot exceed 10,000 characters",
    "string.empty": "Content is a required field",
  }),
  coverImage: Joi.string().uri().messages({
    "string.base": "CoverImage must be of type string",
    "string.uri": "CoverImage must be a valid URL",
  }),
});

export { createPostSchema };
