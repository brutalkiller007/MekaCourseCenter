import React from 'react';
import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

export default function InstructorChart({courses_data}) {

    const [current, set_current] = useState("student");

    const generate_colors = (count) => {
        const colors = [];

        for(let i = 0; i < count; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }

        return colors;
    }

    const chart_data_students = {
        labels: courses_data.map((course) => course.course_name),

        datasets: [
            {
                data: courses_data.map((course) => course.students_count),
                backgroundColor: generate_colors(courses_data.length)
            }
        ]
    }

    const chart_data_income = {
        labels: courses_data.map((course) => course.course_name),

        datasets: [
            {
                data: courses_data.map((course) => course.amount_generated),
                backgroundColor: generate_colors(courses_data.length)
            }
        ]
    }

    return (
        <div className='p-4 text-white flex flex-col gap-3 bg-richblack-800 rounded-lg w-full'>
            <h1 className='font-bold text-xl'>
                Visualize
            </h1>

            <div className='flex justify-start gap-3'>
                <button className={`text-yellow-300 font-bold py-1 p-2 ${current === "student" && "bg-richblack-700"} transition-all duration-200`}
                    onClick={() => {
                        if(current === "income")
                            set_current("student")
                    }}>
                    Students
                </button>

                <button className={`text-yellow-300 font-bold py-1 p-2 ${current === "income" && "bg-richblack-700"} transition-all duration-200`}
                    onClick={() => {
                        if(current === "student")
                            set_current("income")
                    }}>
                    Income
                </button>
            </div>

            <div className='mx-auto w-fit'>
                <Pie data={current === "student" ? chart_data_students : chart_data_income}>

                </Pie>
            </div>
        </div>
    )
}
