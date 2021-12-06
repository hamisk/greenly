import React from "react";
import DatePicker from "react-datepicker";
// import { CalendarContainer } from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";

import "react-datepicker/dist/react-datepicker.css";
import './Calendar.scss'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar(props) {
    const { startDate, setStartDate } = props
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return (
        <DatePicker
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                </button>
                <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                >
                    {years.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>

                <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                    }
                >
                    {months.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                </button>
                </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            calendarClassName="rasta-stripes"
        />
    );
};

// basic calendar

// function Calendar(props) {
//     const { startDate, setStartDate } = props
//     // console.log(startDate)
//     return (
//         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//     )
// }

// calendar with container

// function Calendar(props) {
//     const { startDate, setStartDate } = props
//     const MyContainer = ({ className, children }) => {
//       return (
//         <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
//           <CalendarContainer className={className}>
//             <div style={{ background: "#f0f0f0" }}>
//             </div>
//             <div style={{ position: "relative" }}>{children}</div>
//           </CalendarContainer>
//         </div>
//       );
//     };
//     return (
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         calendarContainer={MyContainer}
//       />
//     );
//   };

export default Calendar