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

//modal
const modalLayout = document.querySelector('#modal-layout')

const eventBtn = modalLayout.querySelector('#event-btn')
const taskBtn = modalLayout.querySelector('#task-btn')
const reminderBtn = modalLayout.querySelector('#reminder-btn')

//forms
const form = new Form(false)

//main objects
const mainDate = new Date();
mainDate.setDate(1)
let days = calculateDays()
const calendar = new Calendar(days)

const daysStore = new Map()

render()

//functions
eventBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(EVENT))
}

taskBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(TASK))
}

reminderBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(REMINDER))
}

addChallengeButton.onclick = () => {
    modalLayout.className = 'modal-layout'

    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(REMINDER))
}

modalLayout.onclick = (e) => {
    if (e.target.id === 'modal-layout') {
        modalLayout.className = 'hidden-layout'
    }
}

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

    const check = [new CalendarEvent(1, 'bruh', '12121', 'bububub', false), new CalendarTask(2, 'bruh', '12121', 'bububub'), new CalendarReminder(3, 'bruh', '12121')]

    for (let i = firstDayIndex; i > 0; i--) {
        days.push(new Day(prevLastDay - i + 1, prevMonth, mainDate.getFullYear(), check, PAST_MONTH_DATE))
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            mainDate.getMonth() === new Date().getMonth()
        ) {
            days.push(new Day(i, currMonth, mainDate.getFullYear(), check, CURRENT_DATE))
        } else {
            days.push(new Day(i, currMonth, mainDate.getFullYear(), []))
        }
    }

    for (let i = 1; i <= nextDays; i++) {
        days.push(new Day(i, nextMonth, mainDate.getFullYear(), [], NEXT_MONTH_DATE))
    }

    return days
}

function render() {
    days = calculateDays(mainDate)
    calendar.setDays(days)
    daysTable.innerHTML = ''
    calendar.renderCalendar(renderCurrentDayChallenges).map(item => daysTable.appendChild(item))

    currentMonthContainer.innerHTML = `<p>${MONTHS[mainDate.getMonth()]} ${mainDate.getFullYear()}</p>`
}

function renderCurrentDayChallenges(challenges) {
    userChallengesContainer.innerHTML = ''
    challenges.map(challenge => userChallengesContainer.appendChild(challenge.render()))
}