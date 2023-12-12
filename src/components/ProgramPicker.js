import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";
import classes from "../App.module.css";

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
          <select
            className={classes.button}
            onChange={(e) => onSelectProgram(e.target.value)}
          >
            <option>Program</option>
            {data.programs.programs.map((program) => (
              <option
                key={program.id}
                value={program.id}
                onClick={() => onSelectProgram(program.id)}
              >
                {program.displayName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ProgramPicker;
