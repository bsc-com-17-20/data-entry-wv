const ValidationRule = ({ validationRules }) => {
  return (
    <div>
      {validationRules.map((validationRule) => (
        <div key={validationRule.id}>
          <h3>Rule: {validationRule.name}</h3>
          <p>Element1: {validationRule.leftSide.description}</p>
          <p>Should be: {validationRule.operator}</p>
          <p>Element2: {validationRule.rightSide.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ValidationRule;
