import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";

export default function BasicLineChart({ transactions, selectedDate }) {
  console.log("selectedDate",selectedDate);
  const [dataset,setdataset]  = React.useState();
  function getLast7Days(selectedDate) {
    const date = dayjs(selectedDate);
  
    if (!date.isValid()) {
      throw new Error("Invalid date format");
    }
  
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = date.subtract(i, 'day').date(); // Get the day of the month as a number
      days.push(day);
    }
    return days.reverse();
  }
  const createAggregatedData = (transactions) => {
    //const currentDate = dayjs();
  //  const currentDate = selectedDate;
  const currentDate = dayjs(selectedDate)
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
    const [x,setx] = React.useState(getLast7Days());
    React.useEffect(()=>{
      const data = createAggregatedData(transactions);
      const arr = Array.from(data.map(itm=> itm.totalAmount));
      const xdata = getLast7Days(selectedDate);
      setx(xdata);
      setdataset(arr);
    },[transactions,selectedDate])
  return (
    <LineChart
     
      xAxis={[{ data: x ||  [1, 2, 3, 4, 5, 7, 6] }]}
      series={[
        {
          data: dataset ||  [2, 5.5, 2, 8.5, 1.5, 5 , 6],
        },
      ]}
    />
  );
}
