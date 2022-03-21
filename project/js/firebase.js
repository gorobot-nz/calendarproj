class Firebase {

    static async postChallenge(username, day, info) {
        const [month, dayNum, year] = day.split('-')

        await fetch(`${FIREBASE_URL}/${username}/${year}/${month}/${dayNum}.json`, {
            method: 'POST',
            body: JSON.stringify({
                ...info
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => console.log(resp.json()))
    }

    static async deleteChallenge(username, day, id) {
        const [month, dayNum, year] = day.split('-')

        await fetch(`${FIREBASE_URL}/${username}/${year}/${month}/${dayNum}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

    static async putChallenge(username, day, id, info) {
        const [month, dayNum, year] = day.split('-')

        await fetch(`${FIREBASE_URL}/${username}/${year}/${month}/${dayNum}/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                ...info
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => console.log(resp.json()))
    }
}