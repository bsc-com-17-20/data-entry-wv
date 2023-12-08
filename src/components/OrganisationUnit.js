// Dhis2OrganizationUnitsComponent.js

import React from 'react';
import { useDataQuery } from '@dhis2/app-runtime';

const query = {
  organisationUnits: {
    resource: 'organisationUnits',
    params: {
      fields: ['id', 'displayName'],
    },
  },
};

const OrganizationUnit= () => {
  const { loading, error, data } = useDataQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error fetching organization units:', error);
    return <p>Error loading data</p>;
  }

  const organizationUnits = data.organisationUnits?.organisationUnits || [];

  return (
    <div>
      <h2>Organization Units</h2>
      <ul>
        {organizationUnits.map((unit) => (
          <li key={unit.id}>{unit.displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationUnit;
