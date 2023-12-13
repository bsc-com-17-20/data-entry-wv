function evaluateExpression(expression, values) {
  // Regex to match expressions like #{dataElement} or #{dataElement}*number
  const match = expression.match(/#{([^{}]+)}(?:\*\s*([\d.]+))?/);
  console.log(values);

  if (match) {
    const dataElementId = match[1];
    const multiplier = match[2] ? parseFloat(match[2]) : 1;
    // console.log(dataElementId);
    // console.log(multiplier);

    // Extract the field value based on dataElementId
    const fieldValue = values[dataElementId];
    console.log(fieldValue);
    // If fieldValue is a number, multiply it by the multiplier
    if (!isNaN(fieldValue)) {
      return fieldValue * multiplier;
    }
  }

  return undefined; // Handle the case where the expression doesn't match the expected format
}

export default evaluateExpression;
