import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

export function useDb(db, auth) {
    const [user] = useAuthState(auth)
    const challengesCollectionRef = collection(db, 'challenges')

    async function addChallenge(challenge, day, month) {
        await addDoc(challengesCollectionRef, { ...challenge, userId: user.uid, day: day, month: month })
    }

    async function getChallenges(month) {
        const q = query(challengesCollectionRef, where(`userId`, '==', user.uid), where('month', '==', month))
        const t = await getDocs(q)
        console.log(t)
    }

    return { addChallenge, getChallenges }
}