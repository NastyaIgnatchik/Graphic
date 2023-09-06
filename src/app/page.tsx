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
import { data } from './data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Home() {

    const [selected, setSelected] = useState<number>(0)

    Chart.defaults.scale.grid.display = false;
    Chart.defaults.scales.linear.max = 10000;
    Chart.defaults.color = 'black'

    function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value == Object.keys(data.periods[0].earnings)[0]) {
            setSelected(0)
        }
        if (e.target.value == Object.keys(data.periods[0].earnings)[1]) {
            setSelected(1)
        }
        if (e.target.value == Object.keys(data.periods[0].earnings)[2]) {
            setSelected(2)
        }
    }

    return (
        <div className='flex flex-col'>
            <select
                className='flex self-end m-10 rounded-2xl  border-solid border-4 border-[blue]'
                onChange={(e) => changeHandler(e)} >
                {
                    Object.entries(data.periods[0].earnings).map((e: [string, string], index: number) => {
                        return (<option
                            key={index}
                            value={e[0]}
                        >
                            {e[1]}
                        </option>)
                    })
                }
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
                                barThickness: 15,
                                borderRadius: 5,

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
                                    callback: function (val: number | string, index: number) {
                                        if (selected == 2) {
                                            return index == 0 || (index + 1) % 5 === 0 ? this.getLabelForValue(Number(val)) : '';
                                        } else return this.getLabelForValue(Number(val))
                                    },
                                }
                            },
                            y: {
                                ticks: {
                                    maxTicksLimit: 10000,
                                    stepSize: 2000,
                                    callback: function (value: number | string) {
                                        if (value == 2000)
                                            return value = 500
                                        if (value == 4000)
                                            return value = 1000
                                        if (value == 6000)
                                            return value = 2000
                                        if (value == 8000)
                                            return value = 5000
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
