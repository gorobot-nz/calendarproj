class Challenge {
    constructor(name, date) {
        this.name = name
        this.date = date
    }

    render() {
        const challenge = document.createElement('div')
        challenge.className = CHALLENGE

        const challengeInner = document.createElement('div')
        challengeInner.className = CHALLENGE__INNER
        challengeInner.innerHTML = this.name

        challenge.appendChild(challengeInner)
        return challenge
    }
}

class CalendarEvent extends Challenge {
    constructor(name, date, period, description) {
        super(name, date)
        this.description = description
        this.period = period
    }

    render() {
        const challenge = super.render()
        challenge.classList.add(EVENT)
        return challenge
    }
}

class CalendarTask extends Challenge {
    constructor(name, date, description) {
        super(name, date)
        this.description = description
    }

    render() {
        const challenge = super.render()
        challenge.classList.add(TASK)
        return challenge
    }
}

class CalendarReminder extends Challenge {
    constructor(name, date) {
        super(name, date)
    }

    render() {
        const challenge = super.render()
        challenge.classList.add(REMINDER)
        return challenge
    }
}