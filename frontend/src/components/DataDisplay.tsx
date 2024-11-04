// DataDisplay.tsx
import React from 'react';
import { ApiResponse } from '../types';

interface DataDisplayProps {
  data: ApiResponse | null;
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
    return <p>{data?.content || "No content available"}</p>;
  }

  return <p>No data available</p>;
};

export default DataDisplay;
