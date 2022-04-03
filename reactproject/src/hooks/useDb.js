import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc } from 'firebase/firestore'
import { useSelector } from "react-redux";

export function useDb(db, auth) {
    const { selectedDay, selectedMonth } = useSelector(state => state.calendarReducer)
    const [user] = useAuthState(auth)
    const challengesCollectionRef = collection(db, 'challenges')

    async function addChallenge(challenge) {
        await addDoc(challengesCollectionRef, { ...challenge, userId: user.uid, day: selectedDay, month: selectedMonth })
    }

    return addChallenge
}