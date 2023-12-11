import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import classes from "../App.module.css";


const organisationUnitsQuery = {
  dataSets: {
    resource: "dataSets",
    id: ({ dataSetId }) => dataSetId,
    params: {
      fields: "organisationUnits[id,displayName]",
    },
  },
};
const OrgUnitPicker = ({ onSelectOrgUnit, dataSetId }) => {
  const { loading, error, data, refetch } = useDataQuery(
    organisationUnitsQuery
  );
  useEffect(() => {
    refetch({ dataSetId });
  }, [dataSetId]);

  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {data && (
        <>
          <select className={classes.button}>
            {data.dataSets.organisationUnits.map((organisationUnit) => (
              <option
                key={organisationUnit.id}
                onClick={() => onSelectOrgUnit(organisationUnit.id)}
              >
                {organisationUnit.displayName}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default OrgUnitPicker;
