/**
 * @file Firestore helper functions for CMS
 * Provides utilities for common Firestore operations
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Get a single document by ID
 * @param {string} collectionName - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<Object|null>}
 */
export async function getDocumentById(collectionName, id) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate(),
        updated_at: docSnap.data().updated_at?.toDate(),
        published_at: docSnap.data().published_at?.toDate()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

/**
 * Get all documents from a collection with optional filtering
 * @param {string} collectionName - Collection name
 * @param {Object} options - Query options
 * @param {Array<{field: string, operator: string, value: any}>} [options.filters] - Where filters
 * @param {string} [options.orderByField] - Field to order by
 * @param {string} [options.orderDirection] - 'asc' or 'desc'
 * @param {number} [options.limit] - Limit number of results
 * @returns {Promise<Array<Object>>}
 */
export async function getDocuments(collectionName, options = {}) {
  try {
    const { filters = [], orderByField, orderDirection = 'asc', limit } = options;

    let q = collection(db, collectionName);
    const constraints = [];

    // Apply filters
    filters.forEach(filter => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });

    // Apply ordering
    if (orderByField) {
      constraints.push(orderBy(orderByField, orderDirection));
    }

    // Apply limit
    if (limit) {
      constraints.push(firestoreLimit(limit));
    }

    // Build query if constraints exist
    if (constraints.length > 0) {
      q = query(collection(db, collectionName), ...constraints);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
      published_at: doc.data().published_at?.toDate()
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

/**
 * Create a new document
 * @param {string} collectionName - Collection name
 * @param {Object} data - Document data
 * @returns {Promise<string>} Document ID
 */
export async function createDocument(collectionName, data) {
  try {
    const now = Timestamp.now();
    const docData = {
      ...data,
      created_at: now,
      updated_at: now
    };

    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

/**
 * Update an existing document
 * @param {string} collectionName - Collection name
 * @param {string} id - Document ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, id, data) {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updated_at: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

/**
 * Delete a document
 * @param {string} collectionName - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, id) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

/**
 * Batch update multiple documents
 * @param {string} collectionName - Collection name
 * @param {Array<{id: string, data: Object}>} updates - Array of updates
 * @returns {Promise<void>}
 */
export async function batchUpdate(collectionName, updates) {
  try {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    updates.forEach(({ id, data }) => {
      const docRef = doc(db, collectionName, id);
      batch.update(docRef, {
        ...data,
        updated_at: now
      });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error in batch update:', error);
    throw error;
  }
}

/**
 * Check if a document exists
 * @param {string} collectionName - Collection name
 * @param {string} field - Field to check
 * @param {any} value - Value to check
 * @returns {Promise<boolean>}
 */
export async function documentExists(collectionName, field, value) {
  try {
    const q = query(
      collection(db, collectionName),
      where(field, '==', value),
      firestoreLimit(1)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking document existence:', error);
    throw error;
  }
}
