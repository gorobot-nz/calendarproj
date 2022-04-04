import { DayModel } from "../models/DayModel";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PAST_MONTH_DATE = 'past-month-date'
const CURRENT_DATE = 'current-date'
const NEXT_MONTH_DATE = 'next-month-date'

export const computeDays = (date, challenges) => {
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const days = new Array()

    const currMonth = MONTHS[date.getMonth()];
    date.setMonth(date.getMonth() - 1)
    const prevMonth = MONTHS[date.getMonth()];
    date.setMonth(date.getMonth() + 2)
    const nextMonth = MONTHS[date.getMonth()];
    date.setMonth(date.getMonth() - 1)

    const challengesObj = challenges.reduce((map, obj) => {
        if (!map[obj.day]) {
            map[obj.day] = [obj]
        } else {
            map[obj.day] = [...map[obj.day], obj]
        }
        return map
    }, {})

    console.log(challengesObj)

    for (let i = firstDayIndex; i > 0; i--) {
        const arr = challengesObj[`${prevMonth}-${prevLastDay - i + 1}-${date.getFullYear()}`] ? challengesObj[`${prevMonth}-${prevLastDay - i + 1}-${date.getFullYear()}`] : []
        days.push(new DayModel(prevLastDay - i + 1, prevMonth, date.getFullYear(), arr, PAST_MONTH_DATE))
    }

    for (let i = 1; i <= lastDay; i++) {
        const arr = challengesObj[`${currMonth}-${i}-${date.getFullYear()}`] ? challengesObj[`${currMonth}-${i}-${date.getFullYear()}`] : []
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days.push(new DayModel(i, currMonth, date.getFullYear(), arr, CURRENT_DATE))
        } else {
            days.push(new DayModel(i, currMonth, date.getFullYear(), arr))
        }
    }

    for (let i = 1; i <= nextDays; i++) {
        const arr = challengesObj[`${nextMonth}-${i}-${date.getFullYear()}`] ? challengesObj[`${nextMonth}-${i}-${date.getFullYear()}`] : []
        days.push(new DayModel(i, nextMonth, date.getFullYear(), arr, NEXT_MONTH_DATE))
    }

    return days
}