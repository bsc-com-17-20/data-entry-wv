function evaluateExpression(expression, values) {
  // Regex to match expressions like #{dataElement} or #{dataElement}*number
  const match = expression.match(
    /#{([a-zA-Z0-9_]+)(?:\.([a-zA-Z0-9_]+))?(\*\d+)?}(?:\+#{[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)?(?:\*\d+)?})?/
  );

  if (match) {
    const dataElementId = match[1];
    const category = match[2];
    const multiplier = match[3] ? parseFloat(match[3].substring(1)) : 1;

    // Extract the field value based on dataElementId
    const fieldValue = values[dataElementId];

    // If fieldValue is a number, multiply it by the multiplier
    if (!isNaN(fieldValue)) {
      return fieldValue * multiplier;
    }
  }

  return undefined; // Handle the case where the expression doesn't match the expected format
}

export default evaluateExpression;
