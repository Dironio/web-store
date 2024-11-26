import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../UI/BirthdayComponent.css";

const BirthdayComponent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const years = Array.from({ length: 106 }, (_, i) => 1920 + i);

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    const daysShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    const formatDateForBackend = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}.${day}.${year}`;
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = formatDateForBackend(date);
            console.log("Дата для отправки на бэк:", formattedDate);
        }
    };

    return (
        <div className="birthday-component">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                placeholderText="Выберите дату"
                className="input-form"
                renderDayContents={(day: number) => `${day}`}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="custom-header">
                        <button
                            type="button"
                            className="month-button"
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                        >
                            {<img className="swap-left" src="/assets/stelka-levo.svg" />}
                        </button>
                        <select
                            className="select-year"
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(Number(value))}
                        >
                            {years.map((option: number) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select-month"
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.findIndex((m) => m === value))
                            }
                        >
                            {months.map((option) => (
                                <option className="option-date" key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="month-button"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                        >
                            {<img className="swap-right" src="/assets/strelka-pravo.svg" />}
                        </button>
                    </div>
                )}
                dayClassName={(date) => {
                    const dayIndex = date.getDay();
                    return `day-${daysShort[dayIndex]}`;
                }}
                showPopperArrow={false}
            />
        </div>
    );
};

export default BirthdayComponent;