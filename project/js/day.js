class Day {
    constructor(dayNum, dayMonth, dayYear, challenges, addClassName = '') {
        this.dayNum = dayNum
        this.dayMonth = dayMonth
        this.dayYear = dayYear
        this.id = `${dayMonth}-${dayNum}-${dayYear}`
        this.challenges = challenges
        this.addClassName = addClassName
    }

    appendChallenge(challenge) {

    }

    removeChallenge(id) {
    }

    renderDay() {
        const dayTd = document.createElement('td')
        dayTd.className = DAY_VALUES__WEEK__DAY
        if (this.addClassName !== '') {
            dayTd.classList.add(this.addClassName)
        }
        dayTd.id = `${this.dayMonth}-${this.dayNum}-${this.dayYear}`
        dayTd.onclick = (e) => {
            console.log(e.target)
        }

        const dayNumContainer = document.createElement('div')
        dayNumContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_NUM
        dayNumContainer.innerHTML = `<p>${this.dayNum}</p>`

        const dayChallengesContainer = document.createElement('div')
        dayChallengesContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_TASKS

        this.challenges.map(challenge => dayChallengesContainer.appendChild(challenge.render()))

        dayTd.appendChild(dayNumContainer)
        dayTd.appendChild(dayChallengesContainer)

        return dayTd
    }
}