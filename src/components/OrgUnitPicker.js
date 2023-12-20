import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import classes from "../App.module.css";
import { CircularLoader } from "@dhis2/ui";

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
      {loading && (
        <select className={classes.button}>
          <option>Org Unit</option>
          <CircularLoader />
        </select>
      )}
      {data && (
        <>
          <select
            className={classes.button}
            onChange={(e) => onSelectOrgUnit(e.target.value)}
          >
            <option key={null}>Org Unit</option>
            {data.dataSets.organisationUnits.map((organisationUnit) => (
              <option
                key={organisationUnit.id}
                value={organisationUnit.id}
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
