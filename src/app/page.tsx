'use client'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    BarElement, Title, Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import React, { useState } from "react";


 export const data = {
     "periods": [
         {
             "earnings": {
                 "year_sum": 'За последний год',
                 "six_month_sum": 'За последние 6 месяцев',
                 "last_month_sum": 'За последний месяц'
             },
             "graph": {
                 "year": {
                     "January": 5,
                     "February": 10,
                     "March": 15,
                     "April": 25,
                     "May": 56,
                     "June": 5487,
                     "July": 387,
                     "August": 847,
                     "September": 5858,
                     "October": 8,
                     "November": 99,
                     "December": 45
                 },
                 "half_year": {
                     "January": 2,
                     "February": 234,
                     "March": 3457,
                     "April": 5000,
                     "May": 500,
                     "June": 567
                 },
                 "month": {
                     "1": 1,
                     "2": 234,
                     "3": 545,
                     "4": 5455,
                     "5": 9005,
                     "6": 554,
                     "7": 400,
                     "8": 123,
                     "9": 323,
                     "10": 566,
                     "11": 656,
                     "12": 545,
                     "13": 454,
                     "14": 545,
                     "15": 3434,
                     "16": 3333,
                     "17": 4345,
                     "18": 54,
                     "19": 45,
                     "20": 345,
                     "21": 324,
                     "22": 678,
                     "23": 990,
                     "24": 677,
                     "25": 676,
                     "26": 3445,
                     "27": 4455,
                     "28": 3456,
                     "29": 7789,
                     "30": 87,
                     "31": 654
                 }
             }
         }
     ]
 }

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Home() {

const [selected,setSelected]=useState< number>( 0)

    Chart.defaults.scale.grid.display = false;
    Chart.defaults.scales.linear.max = 10000;
    Chart.defaults.scale.border.display=false
    Chart.defaults.color = 'black'

function changeHandler (e: React.ChangeEvent<HTMLSelectElement>){
    if(e.target.value ==Object.keys(data.periods[0].earnings)[0]){
    setSelected(0)
    }
    if (e.target.value ==Object.keys(data.periods[0].earnings)[1]){
    setSelected(1)
    }
    if (e.target.value ==Object.keys(data.periods[0].earnings)[2]){
        setSelected(2)
    }
}

  return (
      <div className='flex flex-col'>
          <select
              className='flex self-end m-10 rounded-2xl  border-solid border-4 border-[blue]'
              onChange={(e)=>changeHandler(e)} >
              {
                  Object.entries(data.periods[0].earnings).map((e:[string,string],index:number)=>{
                      return (<option
                          key={index}
                          value={e[0]}
                      >
                          {e[1]}
                      </option>)
                  })
              }
              ))}
          </select>
          <div className='w-[80%]  m-auto bg-[#fadadd] rounded-2xl p-10'>
                  <Bar
                      height={80}
                      data={{
                          labels: Object.keys(Object.entries(data.periods[0].graph)[selected][1]),
                          datasets: [
                              {
                                  data: Object.values(Object.entries(data.periods[0].graph)[selected][1]),
                                  backgroundColor: "blue",
                                  barThickness:15,
                                  borderRadius:5,

                              },
                          ],

                      }}
                      options={{
                          plugins: {
                              legend: {
                                  display: false
                              },
                          },
                          scales: {
                              x: {
                                  ticks: {
                                      callback: function (val: number | string, index:number) {
                                          if (selected == 2) {
                                              return index == 0 || (index + 1) % 5 === 0 ? this.getLabelForValue(val) : '';
                                          } else return this.getLabelForValue(val)
                                      },
                                  }
                              },
                              y: {
                                  ticks: {
                                      beginAtZero: true,
                                      maxTicksLimit:10000,
                                      stepSize:2000,
                                      callback: function (value: number| string) {
                                         if (value==2000)
                                          return value=500
                                          if (value==4000)
                                              return value=1000
                                          if (value==6000)
                                              return value=2000
                                          if (value==8000)
                                              return value=5000
                                          else return value
                                      }

                                  },
                              }
                          }
                      }}
                  />
              </div>
      </div>



  )
}
