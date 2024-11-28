import React from 'react';
import { GetDataModel } from '../models/apiModels';

interface DataDisplayProps {
  data: GetDataModel | null;
  loading: boolean;
  error: string | null;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (data) {
    return <p>{"API Sanity Check: " + data?.content || "No content available"}</p>;
  }

  return <p>No data available</p>;
};

export default DataDisplay;
