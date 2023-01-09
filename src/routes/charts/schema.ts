import Joi from "joi";

export const singer = Joi.object({
  singerName: Joi.string().required(),
});
