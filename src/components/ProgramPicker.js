import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";

const ProgramsQuery = {
  programs: {
    resource: "programs",
    params: ({ organizationUnitId }) => ({
      organizationUnit: `${organizationUnitId}`,
      fields: "id, displayName",
    }),
  },
};

const ProgramPicker = ({ organizationUnitId, onSelectProgram }) => {
  const { loading, error, data, refetch } = useDataQuery(ProgramsQuery);

  useEffect(() => {
    refetch({ organizationUnitId });
  }, [organizationUnitId]);

  return (
    <div>
      {error && `Error: ${error.message}`}
      {loading && `Loading...`}
      {data && (
        <div>
          <p>Programs for Organisation Unit: {organizationUnitId}</p>
          <ul>
            {data.programs.programs.map((program) => (
              <li key={program.id} onClick={() => onSelectProgram(program.id)}>
                {program.displayName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgramPicker;
