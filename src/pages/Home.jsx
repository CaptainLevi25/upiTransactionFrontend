import React, { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import BasicLineChart from "../components/ChartComponent";
import FormDialog from "../components/AddCatDialog";
import SimpleBottomNavigation from "../components/BottomNav";
import BasicBars from "../components/Histogram";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button } from "@mui/material";
import { useAuth } from "../Authprovider";
import DateTimePicker from "../components/DateTime";
import { DateCalendar, DateTimePickerToolbar } from "@mui/x-date-pickers";
import CalendarComponent from "../components/DateTime";
import logo from "./upi.svg"
import Transaction from "../components/Transaction";

export default function Home() {
  const { _id } = JSON.parse(localStorage.getItem("user"));
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
      const data = await axios.get(`http://localhost:8000/transactions/${_id}`);
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
  }, [transactions, categories]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [daily, setdaily] = useState();
  const [monthly, setmonthly] = useState();
  const [weekly, setweekly] = useState();

  dayjs.extend(isBetween);
  dayjs.extend(advancedFormat);
  // const groupByDateAndCategory = (transactions) => {
  //   const groupedData = {};

  //   transactions.forEach((transaction) => {
  //     const date = dayjs(transaction.date).format("YYYY-MM-DD");
  //     const category = transaction.category.name;

  //     if (!groupedData[date]) {
  //       groupedData[date] = {};
  //     }

  //     if (!groupedData[date][category]) {
  //       groupedData[date][category] = 0;
  //     }

  //     groupedData[date][category] += transaction.amount;
  //   });

  //   return groupedData;
  // };

  // const calculateAverages = (groupedData, currentDate, range) => {
  //   const endDate = dayjs(currentDate);
  //   const startDate = endDate.subtract(range, "day");
  //   const categoryTotals = {};
  //   const categoryCounts = {};

  //   // Initialize all categories with 0
  //   Object.keys(groupedData).forEach((date) => {
  //     Object.keys(groupedData[date]).forEach((category) => {
  //       if (!categoryTotals[category]) {
  //         categoryTotals[category] = 0;
  //         categoryCounts[category] = 0;
  //       }
  //     });
  //   });

  //   // Calculate totals and counts within the range
  //   Object.keys(groupedData).forEach((date) => {
  //     if (dayjs(date).isBetween(startDate, endDate, null, "[]")) {
  //       const categories = groupedData[date];
  //       Object.keys(categories).forEach((category) => {
  //         categoryTotals[category] += categories[category];
  //         categoryCounts[category] += 1;
  //       });
  //     }
  //   });

  //   // Calculate averages
  //   const averages = Object.keys(categoryTotals).map((category) => ({
  //     category,
  //     average: categoryTotals[category] / (categoryCounts[category] || 1),
  //   }));

  //   return averages;
  // };

  useEffect(() => {
    setSelectedDate(new Date());
   }, []);
  const groupByDateAndCategory = (transactions) => {
    const groupedData = {};

    transactions.forEach((transaction) => {
      const date = dayjs(transaction.date).format("YYYY-MM-DD");
      const category = transaction.category.name;

      if (!groupedData[date]) {
        groupedData[date] = {};
      }

      if (!groupedData[date][category]) {
        groupedData[date][category] = { totalAmount: 0, count: 0 };
      }

      groupedData[date][category].totalAmount += transaction.amount;
      groupedData[date][category].count += 1;
    });

    return groupedData;
  };

  const calculateAverages = (groupedData, currentDate, range) => {
    const endDate = dayjs(currentDate);
    const startDate = endDate.subtract(range, "day");
    const categoryTotals = {};
    const categoryCounts = {};

    // Initialize all categories with 0
    Object.keys(groupedData).forEach((date) => {
      const categories = groupedData[date];
      Object.keys(categories).forEach((category) => {
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
          categoryCounts[category] = 0;
        }
      });
    });

    // Calculate totals and counts within the range
    Object.keys(groupedData).forEach((date) => {
      if (dayjs(date).isBetween(startDate, endDate, null, "[]")) {
        const categories = groupedData[date];
        Object.keys(categories).forEach((category) => {
          categoryTotals[category] += categories[category].totalAmount;
          categoryCounts[category] += categories[category].count;
        });
      }
    });

    // Calculate averages
    const averages = Object.keys(categoryTotals).map((category) => ({
      category,
      average: categoryTotals[category] / (categoryCounts[category] || 1),
    }));

    return averages;
  };

  const getDailyAverage = (groupedData, currentDate) => {
    const date = dayjs(currentDate).format("YYYY-MM-DD");
    const categories = groupedData[date] || {};

    return Object.keys(categories).map((category) => ({
      date,
      category,
      amount: categories[category],
    }));
  };
  const [activee, setActivee] = useState(0);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [groupedData, setgroupedData] = useState(null);
  // Use the functions to get the data
  useEffect(() => {
    const groupedData = transactions && groupByDateAndCategory(transactions);
    console.log("groupedData", groupedData);
    setgroupedData(groupedData);
  }, [transactions,categories]);

  useEffect(() => {
    const currentDate = new Date();
    console.log("activee",activee);
    //   const lastWeekData = calculateAverages(groupedData, currentDate, 6);
    if (groupedData  ) {
      const lastWeekData = calculateAverages(
        groupedData,
        selectedDate || currentDate,
        6
      );
      console.log("lastWeekData", lastWeekData);
      const lastMonthData = calculateAverages(
        groupedData,
        selectedDate || currentDate,
        29
      );
      console.log("sk",selectedDate);
      const dailyAverageData = calculateAverages(
        groupedData,
        selectedDate || currentDate,
        0
      );
      console.log("dailyAverageData", dailyAverageData);
     dailyAverageData && setdaily(dailyAverageData);
     lastWeekData &&  setweekly(lastWeekData);
      lastMonthData && setmonthly(lastMonthData);
      console.log("changed")
    }

  }, [groupedData, transactions, categories, selectedDate, activee]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { user, logout } = useAuth();
  const handlelogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/logout");
      console.log(res.data);
      logout();
    } catch (e) {
      console.log("logout error ", e);
    }
  };



  return (
    <>
      <div className="w-screen h-16 bg-slate-700 shadow-2xl flex items-center justify-between  p-10">
        <img src={logo} height={195} width={200} className=" hidden md:flex"/>
        <div className="text-white text-2xl md:absolute md:right-40 md:static ">{user.name}</div>
        <Button variant="contained" onClick={handlelogout}>
          Logout
        </Button>
      </div>
      <div className="w-screen min-h-screen bg-slate-400  p-10  overflow-hidden flex flex-col gap-10">
        <div className=" flex  overflow-x-scroll flex-shrink-0  items-center">
          <div className=" flex  gap-10 shadow-lg justify-center items-center p-2">
            {mp.size > 0 &&
              Array.from(mp.entries()).map(([key, value], index) => (
                <CardComponent
                  name={key}
                  key={index}
                  price={21}
                  value={value}
                />
              ))}
          </div>
          <div className="m-9">
            {" "}
            <FormDialog fetchAllTransaction= {fetchAllTransaction} fetchCategoryData= {fetchCategoryData}/>{" "}
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className=" w-[80%] h-96  flex rounded-lg shadow-xl bg-slate-500 flex-col ">
            <div className=" ml-12 text-white text-xl text-center">
              Category Wise Distribution
            </div>
            <BasicBars
              mp={mp}
              activee={activee}
              daily={daily}
              weekly={weekly}
              monthly={monthly}
              selectedDate={selectedDate}
            />
          </div>
          <div className=" w-[20%] flex shadow-lg flex-col justify-evenly p-2 gap-1">
            <div className="w-full h-[70%] bg-slate-600 shadow-sm p-2 rounded-lg">
              <CalendarComponent
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div
              onClick={() => {
                if (activee === 1) {
                  setActivee(0);
                } else setActivee(1);
              }}
              className="w-full h-[7%] bg-slate-600 shadow-sm p-2 rounded-lg flex justify-center items-center text-white cursor-pointer"
              style={{ background: activee === 1 && "purple" }}
            >
              Daily Average
            </div>
            <div
              onClick={() => {
                if (activee === 2) {
                  setActivee(0);
                } else setActivee(2);
              }}
              className="w-full h-[7%] bg-slate-600 shadow-sm p-2 rounded-lg flex justify-center items-center text-white cursor-pointer"
              style={{ background: activee === 2 && "purple" }}
            >
              Weekly Average
            </div>
            <div
              onClick={() => {
                if (activee === 3) {
                  setActivee(0);
                } else setActivee(3);
              }}
              className="w-full h-[7%] bg-slate-600 shadow-sm p-2 rounded-lg flex justify-center items-center text-white cursor-pointer"
              style={{ background: activee === 3 && "purple" }}
            >
              Monthly Average
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className=" w-[100%] h-96  flex rounded-lg shadow-xl bg-slate-500 flex-col ">
            <div className=" ml-12 text-white text-xl text-center">
              Daily Spending Chart
            </div>
            <BasicLineChart transactions={transactions} selectedDate={selectedDate} />
          </div>
        </div>
      </div>
      <div className="w-screen">
        {" "}
        <SimpleBottomNavigation cats={categories} />{" "}

        <div  className="" style={{position : "fixed" , bottom: "40px" , right : "80px"}}> <Transaction label="Payments" cats={categories} fetchAllTransaction = {fetchAllTransaction} fetchCategoryData = {fetchCategoryData} /></div>
      </div>
    </>
  );
}
