class Day {
    constructor(dayNum, dayMonth, dayYear, challenges, addClassName = '') {
        this.dayNum = dayNum
        this.dayMonth = dayMonth
        this.dayYear = dayYear
        this.id = `${dayMonth}-${dayNum}-${dayYear}`
        this.challenges = challenges
        this.addClassName = addClassName
    }

    renderCountOfChallenges(type, count) {
        const challenge = document.createElement('div')
        challenge.className = CHALLENGE
        challenge.classList.add(type)

        const challengeInner = document.createElement('div')
        challengeInner.className = CHALLENGE__INNER
        challengeInner.innerHTML = `${count} ${type}`

        challenge.appendChild(challengeInner)
        return challenge
    }

    renderDay(renderCurrentDayChallenges) {
        const dayTd = document.createElement('td')
        dayTd.className = DAY_VALUES__WEEK__DAY
        if (this.addClassName !== '') {
            dayTd.classList.add(this.addClassName)
        }
        dayTd.id = `${this.dayMonth}-${this.dayNum}-${this.dayYear}`
        dayTd.onclick = () => {
            renderCurrentDayChallenges(this.challenges)
            localStorage.setItem('selectedDay', this.id)
        }

        const dayNumContainer = document.createElement('div')
        dayNumContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_NUM
        dayNumContainer.innerHTML = `<p>${this.dayNum}</p>`

        const dayChallengesContainer = document.createElement('div')
        dayChallengesContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_TASKS

        let eventCounter = 0
        let taskCounter = 0
        let reminderCounter = 0

        this.challenges?.forEach(challenge => {
            if (challenge instanceof CalendarTask) {
                taskCounter++
            } else if (challenge instanceof CalendarEvent) {
                eventCounter++
            } else {
                reminderCounter++
            }
        });

        if (eventCounter !== 0) {
            dayChallengesContainer.appendChild(this.renderCountOfChallenges(EVENT, eventCounter))
        }
        if (taskCounter !== 0) {
            dayChallengesContainer.appendChild(this.renderCountOfChallenges(TASK, taskCounter))
        }
        if (reminderCounter !== 0) {
            dayChallengesContainer.appendChild(this.renderCountOfChallenges(REMINDER, reminderCounter))
        }

        dayTd.appendChild(dayNumContainer)
        dayTd.appendChild(dayChallengesContainer)

        return dayTd
    }
}