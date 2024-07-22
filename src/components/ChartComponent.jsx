import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";

export default function BasicLineChart({ transactions }) {
  const [dataset,setdataset]  = React.useState();
  function getLast7Days() {
    const today = new Date();
   
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      days.push(day.getDate());
    }
    return days.reverse();
  }
  const createAggregatedData = (transactions) => {
    const currentDate = dayjs();
    const data = [];

    for (let i = 0; i < 7; i++) {
      const date = currentDate.subtract(i, "day").startOf("day");
      const nextDate = date.add(1, "day");
      const totalAmount = transactions
        .filter(
          (transaction) =>
            dayjs(transaction.date).isAfter(date) &&
            dayjs(transaction.date).isBefore(nextDate)
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      data.push({ date: date.format("YYYY-MM-DD"), totalAmount });
    }
    console.log("aggregated date is ", data);
    
    return data.reverse(); // Reverse to have the oldest date first
  };
    React.useEffect(()=>{
      const data = createAggregatedData(transactions);
      const arr = Array.from(data.map(itm=> itm.totalAmount));
      setdataset(arr);
    },[transactions])
  return (
    <LineChart
     
      xAxis={[{ data: getLast7Days() ||  [1, 2, 3, 4, 5, 7, 6] }]}
      series={[
        {
          data: dataset ||  [2, 5.5, 2, 8.5, 1.5, 5 , 6],
        },
      ]}
    />
  );
}
