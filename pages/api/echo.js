import validatorFactory from "../../modules/validator-factory";

const validator = validatorFactory({
  type: "object",
  properties: {
    echo: { type: "string" }
  },
  required: ["echo"],
  additionalProperties: false
});

export default (req, res) => {
  const { valid, errors } = validator(req.body);

  if (!valid) {
    res.status(422).json({ id: "INVALID_BODY" });
    return;
  }

  res.json({ reply: req.body.echo });
};
