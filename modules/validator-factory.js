import Ajv from "ajv";
const ajv = new Ajv();

const validatorFactory = schema => data => {
  return ajv.validate(schema, data)
    ? { valid: true }
    : { valid: false, errors: ajv.errors };
};

export default validatorFactory;
