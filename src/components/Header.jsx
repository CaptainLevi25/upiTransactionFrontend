import React from 'react'
import cardimg from "../pages/CardImg.png"
import hisotgramimg from "../pages/Histogramimg.png"
import calenderimg from "../pages/Calenderimg.png"
import dailychartimg from "../pages/Dailychart.png"
import AddImg from "../pages/Addimg.png"
export default function Header() {
  return (
    <div className='w-screen flex flex-col p-4 overflow-x-hidden  bg-slate-400'>
        
        <div className='flex gap-10 items-center flex-wrap'>
            <h1 className='w-[100%] md:w-[50%] text-[60px] text-white' style={{lineHeight: "80px"}}>Categorise Your Spending To Track And Crack </h1>
            <img  className= 'w-[100%] md:flex md:w-[46%] h-[300px]' src={cardimg} alt="" />
        </div>

        <div className='flex gap-10 items-center flex-wrap mt-8'>
        <img  className= 'w-[100%] md:flex md:w-[46%] h-[300px]' src={hisotgramimg} alt="" />
        <h1 className='w-[100%] md:w-[50%] text-[60px] text-white' style={{lineHeight: "80px"}}>Analyse and Compare Your Spending Visually</h1>
        </div>

        <div className='flex gap-10 items-center flex-wrap mt-8 justify-between p-3'>
        <h1 className='w-[100%] md:w-[60%] text-[60px] text-white' style={{lineHeight: "80px"}}>Get The Monthly Weekly and Daily Average Spending According To Date</h1>
        <img  className= 'w-[100%] md:flex md:w-[20%] h-[300px]' src={calenderimg} alt="" />
        </div>

        <div className='flex-col gap-10 items-center flex-wrap mt-8'>
        <img  className= 'w-[100%] md:flex md:w-[100%] h-[300px]' src={dailychartimg} alt="" />
        <h1 className='w-[100%] md:w-[100%] text-[60px] text-white' style={{lineHeight: "80px"}}>Track Your Net Daily Spending Visually</h1>
        </div>


        <div className='flex gap-10 items-center flex-wrap mt-8 justify-between'>
        <div className='w-[100%] md:w-[40%] p-2  bg-slate-600 shadow-sm p-2 rounded-lg '> <img  className= 'w-[100%] md:flex  h-[300px]' src={AddImg} alt="" /> </div>
        <h1 className='w-[100%] md:w-[50%] text-[60px] text-white' style={{lineHeight: "80px"}}>Enter Payment Amount and Cateory Easily</h1>
        </div>
    </div>
  )
}
