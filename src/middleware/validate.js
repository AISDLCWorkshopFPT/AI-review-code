export function validate(schema, property = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => ({
          path: d.path,
          message: d.message,
        })),
      });
    }
    req[property] = value;
    next();
  };
}
