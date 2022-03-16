class Calendar {
    constructor(days) {
        this.days = days
    }

    setDays(days) {
        this.days = days
    }

    renderCalendar() {
        const calendar = new Array()

        const weeksCount = this.days.length / 7
        for (let i = 0; i < weeksCount; i++) {
            const week = document.createElement('tr')
            week.id = i
            week.className = DAY_VALUES__WEEK
            for (let j = 0; j < 7; j++) {
                week.appendChild(this.days[7 * i + j].renderDay())
            }
            calendar.push(week)
        }

        return calendar
    }
}