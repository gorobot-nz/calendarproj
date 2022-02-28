const date = new Date();

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");
    monthDays.innerHTML = ""

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

    document.querySelector(".month-container p").innerHTML = months[date.getMonth()];

    let days = [];

    for (let x = firstDayIndex; x > 0; x--) {
        days.push(`<div class="prev-date">${prevLastDay - x + 1}</div>`);
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days.push(`<div class="today">${i}</div>`);
        } else {
            days.push(`<div>${i}</div>`);
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days.push(`<div class="next-date">${j}</div>`);
    }

    let counter = 0;

    for (let i = 0; i < 5; i++) {
        let tempTR = document.createElement('tr') 
        for (let j = 0; j < 7; j++) {
            let tempTH = document.createElement('th')
            tempTR.appendChild(tempTH).innerHTML = days[counter]
            counter++
        }
        monthDays.appendChild(tempTR)
    }
};

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();