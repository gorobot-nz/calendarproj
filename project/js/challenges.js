class Challenge {
    constructor(id, name) {
        this.id = id
        this.name = name
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
    constructor(id, name, description, period) {
        super(id, name)
        this.description = description
        this.period = period
    }

    render() {
        const challenge = super.render()
        challenge.id = `${this.id}-event`
        challenge.classList.add(EVENT)
        return challenge
    }
}

class CalendarTask extends Challenge {
    constructor(id, name, description) {
        super(id, name)
        this.description = description
    }

    render() {
        const challenge = super.render()
        challenge.id = `${this.id}-task`
        challenge.classList.add(TASK)
        return challenge
    }
}

class CalendarReminder extends Challenge {
    constructor(id, name) {
        super(id, name)
    }

    render() {
        const challenge = super.render()
        challenge.id = `${this.id}-reminder`
        challenge.classList.add(REMINDER)
        return challenge
    }
}