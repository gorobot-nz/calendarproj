export class DayModel {
    constructor(day, month, year, challenges, addStyle = '') {
        this.day = day
        this.month = month
        this.year = year
        this.id = `${month}-${day}-${year}`
        this.challenges = challenges
        this.addStyle = addStyle
    }
}