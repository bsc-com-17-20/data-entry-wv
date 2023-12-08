const ProgramsQuery = {
  dataSets: {
    resource: "program",
    id: ({ organizationUnitId }) => organizationUnitId,
    params: {
      fields: "organisationUnits[id,displayName]",
    },
  },
};
