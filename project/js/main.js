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

let days = calculateDays(mainDate)

const calendar = new Calendar(days)

render()

//functions
themeSwitchToggle.onclick = () => {
    body.className === LIGHT_THEME ? body.className = DARK_THEME : body.className = LIGHT_THEME
    console.log(body.className)
}

nextMonthButton.onclick = () => {
    mainDate.setMonth(mainDate.getMonth() + 1);
    render()
}

prevMonthButton.onclick = () => {
    mainDate.setMonth(mainDate.getMonth() - 1);
    render()
}

function calculateDays(date) {
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

    console.log('lastday',lastDay)
    console.log('prevLastDay',prevLastDay)
    console.log('firstDayIndex',firstDayIndex)
    console.log('lastDayIndex',lastDayIndex)
    console.log('nextDays',nextDays)

    const days = new Array()

    for (let i = firstDayIndex; i > 0; i--) {
        days.push(new Day(prevLastDay - i + 1, [], PAST_MONTH_DATE))
    }

    for (let i = 1; i <= lastDay; i++) {
        days.push(new Day(i))

    }

    for (let i = 1; i <= nextDays; i++) {
        days.push(new Day(i, [], NEXT_MONTH_DATE))
    }

    return days
}

function render() {
    days = calculateDays(mainDate)
    console.log(days)
    currentMonthContainer.innerHTML = `<p>${MONTHS[mainDate.getMonth()]} ${mainDate.getFullYear()}</p>`
}