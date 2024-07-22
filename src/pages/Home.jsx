import React, { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import BasicLineChart from "../components/ChartComponent";
import FormDialog from "../components/AddCatDialog";
import SimpleBottomNavigation from "../components/BottomNav";
import BasicBars from "../components/Histogram";
import axios from "axios";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import advancedFormat from 'dayjs/plugin/advancedFormat';
export default function Home() {
  const {_id} =  JSON.parse(localStorage.getItem('user'));
  const [categories, setcategories] = useState([]);
  const [transactions, settransactions] = useState([]);
  const [mp, setmp] = useState(new Map());
 
  const fetchCategoryData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/getcategories/${_id}`
      );
      setcategories(data.data);
      console.log(categories);
    } catch (e) {
      console.log("error", e);
    }
  };



  const fetchAllTransaction = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/transactions/${_id}`
      );
      console.log(data.data);
      settransactions(data.data);
    } catch (error) {
      console.log("error in transaction", error);
    }
  };
  const createMap = () => {
    const map = new Map();
   


    if (transactions && transactions.length > 0) {
      transactions.forEach((item) => {
        const categoryName = item.category.name;
        if (!map.has(categoryName)) {
          map.set(categoryName, []); // Initialize an empty array for the category
        }
        map.get(categoryName).push([item.amount, item.description, item.date]);
      });
      console.log(map);

     // setmp(map);

    }
    if (categories && categories.length > 0) {
      categories.forEach((item) => {
        const categoryName = item.name;
        if (!map.has(categoryName)) {
          map.set(categoryName, []); // Initialize an empty array for the category
        }
       // map.get(categoryName).push([item.amount, item.description, item.date]);
      });
      console.log(map);

    }
     setmp(map);

      
  };



  useEffect(() => {
    fetchAllTransaction();
    fetchCategoryData();
    
  }, []);

  useEffect(() => {
    createMap();
    
  }, [transactions,categories]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

dayjs.extend(isBetween);
dayjs.extend(advancedFormat);
const groupByDateAndCategory = (transactions) => {
  const groupedData = {};
  
  transactions.forEach(transaction => {
    const date = dayjs(transaction.date).format('YYYY-MM-DD');
    const category = transaction.category.name;

    if (!groupedData[date]) {
      groupedData[date] = {};
    }

    if (!groupedData[date][category]) {
      groupedData[date][category] = 0;
    }

    groupedData[date][category] += transaction.amount;
  });

  return groupedData;
};

const calculateAverages = (groupedData, currentDate, range) => {
  const endDate = dayjs(currentDate);
  const startDate = endDate.subtract(range, 'day');
  const categoryTotals = {};
  const categoryCounts = {};

  // Initialize all categories with 0
  Object.keys(groupedData).forEach(date => {
    Object.keys(groupedData[date]).forEach(category => {
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
        categoryCounts[category] = 0;
      }
    });
  });

  // Calculate totals and counts within the range
  Object.keys(groupedData).forEach(date => {
    if (dayjs(date).isBetween(startDate, endDate, null, '[]')) {
      const categories = groupedData[date];
      Object.keys(categories).forEach(category => {
        categoryTotals[category] += categories[category];
        categoryCounts[category] += 1;
      });
    }
  });

  // Calculate averages
  const averages = Object.keys(categoryTotals).map(category => ({
    category,
    average: categoryTotals[category] / (categoryCounts[category] || 1),
  }));

  return averages;
};

const getDailyAverage = (groupedData, currentDate) => {
  const date = dayjs(currentDate).format('YYYY-MM-DD');
  const categories = groupedData[date] || {};

  return Object.keys(categories).map(category => ({
    date,
    category,
    amount: categories[category],
  }));
};

// Use the functions to get the data
const currentDate = '2024-07-23';
const groupedData = groupByDateAndCategory(transactions);
console.log("groupedData" , groupedData);
const lastWeekData = calculateAverages(groupedData, currentDate, 6);
console.log("lastWeekData", lastWeekData);
const lastMonthData = calculateAverages(groupedData, currentDate, 29);
const dailyAverageData = calculateAverages(groupedData, currentDate, 0);
console.log("dailyAverageData",dailyAverageData);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="w-screen min-h-screen bg-slate-400  p-10  overflow-hidden flex flex-col gap-10">
        <div className=" flex  overflow-x-scroll flex-shrink-0  items-center">
          <div className=" flex  gap-10">
            {mp.size > 0 &&
              Array.from(mp.entries()).map(([key, value],index) => (
                
                <CardComponent name={key} key={index} price={21} value={value} />

              ))}
          </div>
          <div className="m-9">
            {" "}
            <FormDialog />{" "}
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className=" w-[80%] h-96  flex rounded-lg shadow-xl bg-slate-500 flex-col ">
            <div className=" ml-12 text-white text-xl text-center">
              Category Wise Distribution
            </div>
            <BasicBars mp={mp}/>
          </div>
          <div className=" w-[20%] flex shadow-lg">
            <CardComponent />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className=" w-[100%] h-96  flex rounded-lg shadow-xl bg-slate-500 flex-col ">
            <div className=" ml-12 text-white text-xl text-center">
             Daily Spending Chart
            </div>
            <BasicLineChart transactions={transactions} />
          </div>
        </div>
      </div>
      <div className="w-screen">
        {" "}
        <SimpleBottomNavigation cats= {categories} />{" "}
      </div>
    </>
  );
}
