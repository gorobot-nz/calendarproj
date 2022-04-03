class ChallengeModel {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class CalendarEventModel extends ChallengeModel {
    constructor(id, name, description, period) {
        super(id, name)
        this.description = description
        this.period = period
    }
}

class CalendarTaskModel extends ChallengeModel {
    constructor(id, name, description) {
        super(id, name)
        this.description = description
    }
}

class CalendarReminderModel extends ChallengeModel {
    constructor(id, name) {
        super(id, name)
    }
}