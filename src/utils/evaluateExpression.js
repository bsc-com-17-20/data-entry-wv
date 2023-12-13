function evaluateExpression(expression, values) {
  // Regex to match expressions like #{dataElementId} or #{dataElement*1.5}
  // const match = expression.match(/#{([^{}]+)}(?:\*([\d.]+))?/);

  // Regex to match expressions like #{dataElementId} or #{dataElement*1.5} or #{dataElementId.categoryId}
  const match = expression.match(/#{([^{}]+)}(?:\*([\d.]+))?(?:\.([^{}]+))?/);

  if (match) {
    const dataElementId = match[1];
    const multiplicationFactor = match[2] ? parseFloat(match[2]) : 1;
    const _categoryId = match[3]; // We will ignore this for now

    // Extract the field value based on dataElementId
    let fieldValue = values[dataElementId];

    // If categoryId is present, access the nested property
    // if (categoryId && fieldValue && fieldValue[categoryId]) {
    //   fieldValue = fieldValue[categoryId];
    // }

    // Apply the multiplication factor
    fieldValue = fieldValue * multiplicationFactor;

    return fieldValue;
  }

  // TODO: Handle if the expression doesn't match the regex
  return undefined;
}

export default evaluateExpression;
