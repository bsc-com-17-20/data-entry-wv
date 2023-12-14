// src/components/DataEntryForm.js
import React, { useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { ReactFinalForm, InputFieldFF, FileInputFieldFF, TextAreaFieldFF, Button, hasValue, CheckboxFieldFF } from "@dhis2/ui";
import classes from "../App.module.css";
import evaluateExpression from "../utils/evaluateExpression";
import { gql } from "graphql-tag";  // Import gql from graphql-tag

const { Form, Field } = ReactFinalForm;

// Define your GraphQL query
const DataSetElementsQuery = gql`
  query DataSetElementsQuery($dataSetId: ID!) {
    dataSets(id: $dataSetId) {
      id
      displayName
      dataSetElements {
        dataElement {
          id
          displayName
          valueType
        }
      }
      validationRules {
        validationRules {
          id
          displayInstruction
          leftSide {
            expression
          }
          rightSide {
            expression
          }
          operator
        }
      }
    }
  }
`;

const DataEntryForm = ({ dataSetId }) => {
  const { loading, error, data, refetch } = useDataQuery(DataSetElementsQuery, {
    variables: { dataSetId },
  });

  useEffect(() => {
    refetch({ dataSetId });
  }, [dataSetId, refetch]);

  const onSubmit = (values) => {
    console.log(values);
  };

  const alertValues = (values) => {
    const formattedValuesString = JSON.stringify(values, null, 2);
    alert(formattedValuesString);
  };

  const validate = (values) => {
    const errors = {};
    if (!loading && data) {
      data.dataSets.validationRules.validationRules.forEach((rule) => {
        const leftValue = evaluateExpression(rule.leftSide.expression, values);
        const rightValue = evaluateExpression(rule.rightSide.expression, values);

        switch (rule.operator) {
          // Add your existing switch cases for validation rules
          case "equal_to":
            if (leftValue !== rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "not_equal_to":
            if (leftValue === rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "greater_than":
            if (leftValue <= rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "greater_than_or_equal_to":
            if (leftValue < rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "less_than":
            if (leftValue >= rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "less_than_or_equal_to":
            if (leftValue > rightValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "compulsory_pair":
            if (leftValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          case "exclusive_pair":
            if (leftValue) {
              errors[rule.id] = `${rule.displayInstruction}`;
            }
            break;
          default:
            break;
        }
      });
    }
    return errors;
  };

  const typeMapping = {
    BOOLEAN: "checkbox",
    FILE_RESOURCE: "file",
  };

  const fieldTypeMapping = {
    BOOLEAN: CheckboxFieldFF,
    FILE_RESOURCE: FileInputFieldFF,
    LONG_TEXT: TextAreaFieldFF,
  };

  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {data && (
        <div className={classes.forms__design}>
          <div>
            <h1>{data.dataSets.displayName}</h1>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  {data.dataSets.dataSetElements.map((dataElement) => (
                    <div key={dataElement.dataElement.id}>
                      <Field
                        id={dataElement.dataElement.id}
                        name={dataElement.dataElement.id}
                        label={dataElement.dataElement.displayName}
                        component={
                          fieldTypeMapping[dataElement.dataElement.valueType] ||
                          InputFieldFF
                        }
                        type={
                          typeMapping[dataElement.dataElement.valueType] ||
                          dataElement.dataElement.valueType
                        }
                        validate={hasValue}
                        placeholder={`${dataElement.dataElement.valueType} and ${dataElement.dataElement.id}`}
                      >
                        {(props) => (
                          <div>
                            {props.meta.error && props.meta.touched && (
                              <div style={{ color: 'red' }}>
                                {props.meta.error}
                              </div>
                            )}
                            {props.children}
                          </div>
                        )}
                      </Field>
                    </div>
                  ))}
                  <div className={classes.submit__button}>
                    <Button type="submit" primary>
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            ></Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEntryForm;
