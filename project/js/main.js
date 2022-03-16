//body
const body = document.querySelector('body')

// containers
const daysTable = document.querySelector('#days-table')
const userAvatarContainer = document.querySelector('#user-avatar-container')
const userChallengesContainer = document.querySelector('#user-challenges-container')
const currentMonthContainer = document.querySelector('#currnet-month-container')

// buttons      
const switchMenuButton = document.querySelector('#switch-user-menu-button')
const nextMonthButton = document.querySelector('#next-month-button')
const prevMonthButton = document.querySelector('#prev-month-button')
const settingsButton = document.querySelector('#settings-button')
const addChallengeButton = document.querySelector('#add-challenge-button')
const themeSwitchToggle = document.querySelector('#theme-switch-toggle')

//main objects
const mainDate = new Date();
mainDate.setDate(1)

let days = calculateDays()

const calendar = new Calendar(days)

render()

//functions
themeSwitchToggle.onclick = () => {
    body.className === LIGHT_THEME ? body.className = DARK_THEME : body.className = LIGHT_THEME
}

nextMonthButton.onclick = () => {
    mainDate.setMonth(mainDate.getMonth() + 1);
    render()
}

prevMonthButton.onclick = () => {
    mainDate.setMonth(mainDate.getMonth() - 1);
    render()
}

function calculateDays() {
    const lastDay = new Date(
        mainDate.getFullYear(),
        mainDate.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        mainDate.getFullYear(),
        mainDate.getMonth(),
        0
    ).getDate();

    const firstDayIndex = mainDate.getDay();

    const lastDayIndex = new Date(
        mainDate.getFullYear(),
        mainDate.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const days = new Array()

    const currMonth = MONTHS[mainDate.getMonth()];
    mainDate.setMonth(mainDate.getMonth() - 1)
    const prevMonth = MONTHS[mainDate.getMonth()];
    mainDate.setMonth(mainDate.getMonth() + 2)
    const nextMonth = MONTHS[mainDate.getMonth()];
    mainDate.setMonth(mainDate.getMonth() - 1)

    for (let i = firstDayIndex; i > 0; i--) {
        days.push(new Day(prevLastDay - i + 1, prevMonth, [], PAST_MONTH_DATE))
    }

    for (let i = 1; i <= lastDay; i++) {
        days.push(new Day(i, currMonth, []))

    }

    for (let i = 1; i <= nextDays; i++) {
        days.push(new Day(i, nextMonth, [], NEXT_MONTH_DATE))
    }

    return days
}

function render() {
    days = calculateDays(mainDate)
    console.log(days)
    currentMonthContainer.innerHTML = `<p>${MONTHS[mainDate.getMonth()]} ${mainDate.getFullYear()}</p>`
}