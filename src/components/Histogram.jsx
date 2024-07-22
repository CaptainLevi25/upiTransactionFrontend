import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars({ mp }) {
  const [xaxis, setxaxis] = useState([]);
  const [yaxis, setyaxis] = useState([]);

  function sumMapNestedArrayZerothIndex(myMap) {
    const averageArray = [];

    for (const [key, value] of myMap) {
      // Check if value is an array of arrays
      if (
        Array.isArray(value) &&
        value.every((innerArr) => Array.isArray(innerArr))
      ) {
        const zerothIndexValues = value.map((innerArr) => {
          // Check if 0th index value is a number or undefined (for missing values)
          return typeof innerArr[0] === "number" ? innerArr[0] : 0;
        });

        // Check if any elements in zerothIndexValues are numbers for calculation
        if (zerothIndexValues.some((val) => typeof val === "number")) {
          const average =
            zerothIndexValues.reduce((acc, val) => acc + val, 0) /
            zerothIndexValues.length;
          averageArray.push(average);
        } else {
          console.warn(
            `Skipping key "${key}" because no numeric values found for averaging`
          );
          averageArray.push(0); // Push zero for non-calculable averages
        }
      } else {
        console.warn(
          `Skipping key "${key}" because value is not an array of arrays`
        );
      }
    }

    return averageArray;
  }

  useEffect(() => {
    console.log("mp from line chart", mp);
    const keyarr = Array.from(mp.keys());
    console.log(keyarr);
    setxaxis(keyarr);
    const valarr = sumMapNestedArrayZerothIndex(mp);
    console.log("valarr", valarr);
    setyaxis(valarr);
    console.log(valarr);
  }, [mp]);
  return (
    <BarChart
      xAxis={[
        { scaleType: "band", data: xaxis || ["group A", "group B", "group C"] },
      ]}
      series={[{ data: yaxis }]}
    />
  );
}
