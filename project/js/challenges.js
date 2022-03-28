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

    render(onChallengeClick) {
        const challenge = super.render()
        challenge.id = `${this.id}-event`
        challenge.classList.add(EVENT)

        challenge.onclick = () => {
            onChallengeClick(EVENT, this.name, this.description, this.period)
            localStorage.setItem('id', this.id)
        }
        return challenge
    }
}

class CalendarTask extends Challenge {
    constructor(id, name, description) {
        super(id, name)
        this.description = description
    }

    render(onChallengeClick) {
        const challenge = super.render()
        challenge.id = `${this.id}-task`
        challenge.classList.add(TASK)

        challenge.onclick = () => {
            onChallengeClick(TASK, this.name, this.description)
            localStorage.setItem('id', this.id)
        }
        return challenge
    }
}

class CalendarReminder extends Challenge {
    constructor(id, name) {
        super(id, name)
    }

    render(onChallengeClick) {
        const challenge = super.render()
        challenge.id = `${this.id}-reminder`
        challenge.classList.add(REMINDER)

        challenge.onclick = () => {
            onChallengeClick(REMINDER, this.name)
            localStorage.setItem('id', this.id)
        }
        return challenge
    }
}