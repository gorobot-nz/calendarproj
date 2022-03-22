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
const modalHeader = document.querySelector('#modal-header')

const eventBtn = modalLayout.querySelector('#event-btn')
const taskBtn = modalLayout.querySelector('#task-btn')
const reminderBtn = modalLayout.querySelector('#reminder-btn')

//forms
const form = new Form(false)

localStorage.removeItem('selectedDay')
localStorage.removeItem('selectedMonth')
localStorage.removeItem('id')

if (!localStorage.getItem('user')) {
    alert('Enter your username in settings')
}

//main objects
const daysStore = new Map()
const mainDate = new Date();
mainDate.setDate(1)
let days = calculateDays()
const calendar = new Calendar(days)

render()

//functions
eventBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(EVENT, render))
}

taskBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(TASK, render))
}

reminderBtn.onclick = () => {
    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(REMINDER, render))
}

addChallengeButton.onclick = () => {
    modalLayout.className = 'modal-layout'
    modalHeader.className = 'modal-header'
    form.setIsEdit(false)

    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(REMINDER, render))
}

modalLayout.onclick = (e) => {
    if (e.target.id === 'modal-layout') {
        modalLayout.className = 'hidden-layout'
        localStorage.removeItem('id')
    }
}

themeSwitchToggle.onclick = () => {
    body.className === LIGHT_THEME ? body.className = DARK_THEME : body.className = LIGHT_THEME
}

nextMonthButton.onclick = async () => {
    mainDate.setMonth(mainDate.getMonth() + 1);
    const selectedMonth = `${MONTHS[mainDate.getMonth()]}-${mainDate.getFullYear()}`
    localStorage.setItem('selectedMonth', selectedMonth)
    await render()
}

prevMonthButton.onclick = async () => {
    mainDate.setMonth(mainDate.getMonth() - 1);
    const selectedMonth = `${MONTHS[mainDate.getMonth()]}-${mainDate.getFullYear()}`
    localStorage.setItem('selectedMonth', selectedMonth)
    await render()
}

settingsButton.onclick = () => {
    modalLayout.className = 'modal-layout'
    modalHeader.className = 'hidden-layout'

    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderSettingsForm(render))
}

function calculateDays() {
    const selectedMonth = `${MONTHS[mainDate.getMonth()]}-${mainDate.getFullYear()}`
    localStorage.setItem('selectedMonth', selectedMonth)

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
        const challenges = daysStore.get(`${MONTHS[mainDate.getMonth()]}-${i}-${mainDate.getFullYear()}`)

        days.push(new Day(prevLastDay - i + 1, prevMonth, mainDate.getFullYear(), challenges, PAST_MONTH_DATE))
    }

    for (let i = 1; i <= lastDay; i++) {
        const challenges = daysStore.get(`${MONTHS[mainDate.getMonth()]}-${i}-${mainDate.getFullYear()}`)
        if (
            i === new Date().getDate() &&
            mainDate.getMonth() === new Date().getMonth()
        ) {
            days.push(new Day(i, currMonth, mainDate.getFullYear(), challenges, CURRENT_DATE))
        } else {
            days.push(new Day(i, currMonth, mainDate.getFullYear(), challenges))
        }
    }

    for (let i = 1; i <= nextDays; i++) {
        const challenges = daysStore.get(`${MONTHS[mainDate.getMonth()]}-${i}-${mainDate.getFullYear()}`)
        days.push(new Day(i, nextMonth, mainDate.getFullYear(), challenges, NEXT_MONTH_DATE))
    }

    return days
}

async function render() {
    daysStore.clear()
    const user = localStorage.getItem('user')
    const month = localStorage.getItem('selectedMonth')
    const temp = await Firebase.getChallenges(user, month)

    const [monthName, year] = month.split('-')

    try {
        Object.keys(temp)?.map(key => {
            daysStore.set(`${monthName}-${key}-${year}`, getChallenges(temp[key]))
        });
    } catch (e) {
        console.log('nope')
    }

    days = calculateDays(mainDate)
    calendar.setDays(days)
    daysTable.innerHTML = ''
    calendar.renderCalendar(renderCurrentDayChallenges).map(item => daysTable.appendChild(item))
    currentMonthContainer.innerHTML = `<p>${MONTHS[mainDate.getMonth()]} ${mainDate.getFullYear()}</p>`


    const currentDayChallenges = daysStore.get(localStorage.getItem('selectedDay'))
    if (currentDayChallenges) {
        userChallengesContainer.innerHTML = ''
        currentDayChallenges?.map(challenge => userChallengesContainer.appendChild(challenge.render(onChallengeClick)))
    }
}

function getChallenges(challengesObject) {
    const challengesArray = Object.keys(challengesObject).map(key => {
        return parseObjectToChallenge(key, challengesObject[key])
    })
    return challengesArray
}

function parseObjectToChallenge(key, value) {
    if (value.type === REMINDER) {
        return new CalendarReminder(key, value.title)
    } else if (value.type === TASK) {
        return new CalendarTask(key, value.title, value.description)
    } else {
        return new CalendarEvent(key, value.title, value.description, value.period)
    }
}

function renderCurrentDayChallenges(challenges) {
    userChallengesContainer.innerHTML = ''
    challenges?.map(challenge => userChallengesContainer.appendChild(challenge.render(onChallengeClick)))
}

function onChallengeClick(formType, title, description = '', period = '') {
    modalLayout.className = 'modal-layout'
    modalHeader.className = 'hidden-layout'
    form.setIsEdit(true)

    const formContainer = modalLayout.querySelector('#form-container')
    formContainer.innerHTML = ''
    formContainer.appendChild(form.renderForm(formType, render))

    const titleInput = document.querySelector('#title')
    const descriptionInput = document.querySelector('#description')
    const periodInput = document.querySelector('#period')

    titleInput.value = title
    if (descriptionInput) {
        descriptionInput.value = description
    }
    if (periodInput) {
        periodInput.value = period
    }
}