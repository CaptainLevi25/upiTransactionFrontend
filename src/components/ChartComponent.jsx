import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


export default function BasicLineChart({mp}) {

  return (
    <LineChart
      xAxis= { [{ data: [1,2,3,4,5,7] }]}
      series={[
        {
          data:  [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
 
    />
  );
}