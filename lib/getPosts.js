import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Fetch posts from Firestore, sorted with pinned posts first, then by date descending.
 * @param {number} [limitCount] - Optional. If provided, limits the number of posts returned.
 * @returns {Promise<Array>} Array of post objects.
 */
export async function getPosts(limitCount) {
  const q = query(collection(db, "posts"), orderBy("pin", "desc"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  let posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (limitCount) {
    posts = posts.slice(0, limitCount);
  }
  return posts;
}
