import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";

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
          <p>Organisation Units for DataSet {dataSetId}:</p>
          <ul>
            {data.dataSets.organisationUnits.map((organisationUnit) => (
              <li
                key={organisationUnit.id}
                onClick={() => onSelectOrgUnit(organisationUnit.id)}
              >
                {organisationUnit.displayName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrgUnitPicker;
