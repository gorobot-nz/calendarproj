class Firebase {

    static postChallenge(username, day, info) {
        const [month, dayNum, year] = day.split('-')

        console.log(month)
        console.log(dayNum)
        console.log(year)

        fetch(`${FIREBASE_URL}/${username}/${year}/${month}/${dayNum}.json`, {
            method: 'POST',
            body: JSON.stringify({
                ...info
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => console.log(resp.json()))
    }

    static deleteChallenge(username, year, month, day, id) {
        fetch(`${FIREBASE_URL}${username}/${day}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => console.log(resp.json()))
    }

    static async getChallenges(username, month) {

        const [monthName, year] = month.split('-')

        const responce = await fetch(`${FIREBASE_URL}/${username}/${year}/${monthName}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await responce.json()
        return data
    }
}