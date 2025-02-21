import Joi, { ObjectSchema } from "joi";

const updatePostSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().min(4).max(50).messages({
    "string.base": "Title must be of type string",
    "string.min": "Title must be at least 4 characters",
    "string.max": "Title cannot exceed 50 characters",
  }),
  slug: Joi.string()
    .min(4)
    .max(40)
    .pattern(/^[a-z0-9-]+$/)
    .messages({
      "string.base": "Slug must be of type string",
      "string.min": "Slug must be at least 4 characters",
      "string.max": "Slug cannot exceed 40 characters",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  content: Joi.string().min(4).max(10000).messages({
    "string.base": "Content must be of type string",
    "string.min": "Content must be at least 4 characters",
    "string.max": "Content cannot exceed 10,000 characters",
  }),
  coverImage: Joi.string().uri().messages({
    "string.base": "CoverImage must be of type string",
    "string.uri": "CoverImage must be a valid URL",
  }),
});

export { updatePostSchema };
