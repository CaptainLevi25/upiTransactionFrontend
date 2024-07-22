import React from "react";

export default function CardComponent({ name, price, value }) {
  function formatDateToDayMonth(dateString) {
    const date = new Date(dateString); // Create a Date object

    const options = {
      day: "numeric",
      month: "long", // Use 'short' for abbreviations like Jul
      year: "numeric", // Intentionally include year to omit it (explained below)
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Extract day and month using string manipulation
    const parts = formattedDate.split(" ");
    const day = parts[0];
    const month = parts[1];

    return `${day} ${month}`; // Combine day with suffix and month
  }

  return (
    <div className=" bg-slate-100 h-64 w-80 flex flex-col shadow-lg rounded-lg overflow-hidden  ">
      <div className=" bg-slate-300 h-1/4  flex  item-center p-4 justify-between items-center">
        <div className="text-4xl">{name}</div>
        <div className="text-5xl" style={{ color: "red" }}>
          {" "}
          ${price}
        </div>
      </div>
      <div className=" overflow-y-scroll">
        <div className="flex justify-between p-4 sticky top-0 bg-slate-100">
          <div className="text-xl">Name</div>
          <div className="text-xl">Amount</div>
          <div className="text-xl">Date</div>
        </div>
        {value?.map((itm) => (
          <div className="flex justify-between p-4">
            <div className="text-xl">{itm[1]}</div>
            <div className="text-xl">{itm[0]}</div>
            <div className="text-xl">{formatDateToDayMonth(itm[2])}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
