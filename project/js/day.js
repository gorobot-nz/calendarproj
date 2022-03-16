class Day {
    constructor(dayNum, dayMonth, challenges, addClassName = '') {
        this.dayNum = dayNum
        this.dayMonth = dayMonth
        this.challenges = challenges
        this.addClassName = addClassName
    }

    renderDay() {
        const dayTd = document.createElement('td')
        dayTd.className = DAY_VALUES__WEEK__DAY
        if (this.addClassName !== '') {
            dayTd.classList.add(this.addClassName)
        }
        dayTd.id = `${this.dayMonth}-${this.dayNum}`
        dayTd.onclick = (e) => {
            console.log(e.target)
        }

        const dayNumContainer = document.createElement('div')
        dayNumContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_NUM
        dayNumContainer.innerHTML = `<p>${this.dayNum}</p>`

        const dayChallengesContainer = document.createElement('div')
        dayChallengesContainer.className = DAY_VALUES__WEEK__DAY__DAY_INFO__DAY_TASKS
        dayChallengesContainer.innerHTML = `
            <div class="challenge task">
                <div class="challenge__inner">
                    Task
                </div>
            </div>
            <div class="challenge event">
                <div class="challenge__inner">
                    Task
                </div>
            </div>
            <div class="challenge reminder">
                <div class="challenge__inner">
                    Task
                </div>
            </div>
        `
        dayTd.appendChild(dayNumContainer)
        dayTd.appendChild(dayChallengesContainer)

        return dayTd
    }
}