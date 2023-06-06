const validationMapper = (err) => {
  let invalidParams = [];
  if (err?.details?.length > 0) {
    for (const iterator of err.details) {
      invalidParams.push(iterator.context.key);
    }
    return invalidParams;
  }
  return null;
};
module.exports = { validationMapper };
