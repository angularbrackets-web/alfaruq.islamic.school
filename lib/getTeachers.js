import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function getTeachers() {
  try {
    const teachersCollection = collection(db, 'teachers');
    const teacherSnapshot = await getDocs(teachersCollection);
    const teacherList = teacherSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return teacherList;
  } catch (error) {
    console.error("Detailed error fetching teachers:", error);
    // Re-throw the error to be caught by the server component boundary
    throw error;
  }
}
