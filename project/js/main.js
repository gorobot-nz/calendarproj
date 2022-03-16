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



const date = new Date();
date.setDate(1);

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



console.log(date)
console.log('lastday', lastDay)
console.log('prevlastday', prevLastDay)
console.log('firstdayindex', firstDayIndex)
console.log('lastdayindex', lastDayIndex)
console.log('nextdays', nextDays)
console.log(MONTHS[date.getMonth()])
console.log(date.getFullYear())

currentMonthContainer.innerHTML = `<p>${MONTHS[date.getMonth()]} ${date.getFullYear()}</p>`



themeSwitchToggle.onclick = () => {
    body.className === LIGHT_THEME ? body.className = DARK_THEME : body.className = LIGHT_THEME
    console.log(body.className)
}

nextMonthButton.onclick = () => {
    date.setMonth(date.getMonth() + 1);
    render()
}

prevMonthButton.onclick = () => {
    date.setMonth(date.getMonth() - 1);
    render()
}

function render() {
    currentMonthContainer.innerHTML = `<p>${MONTHS[date.getMonth()]} ${date.getFullYear()}</p>`
}