const validationMapper = (err) => {
  let invalidParams = {};
  if (err?.details?.body.length) {
    for (const iterator of err.details.body) {
      invalidParams[iterator.context.key] = iterator.message.replace(
        /[\"\'\\\/]*/gi,
        ""
      );
    }
    return invalidParams;
  }
  return null;
};
module.exports = { validationMapper };
