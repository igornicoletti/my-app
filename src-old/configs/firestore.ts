import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
  type DocumentData,
  type DocumentSnapshot,
  type FieldPath,
  type FirestoreDataConverter,
  type OrderByDirection,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  type UpdateData,
  type WithFieldValue
} from 'firebase/firestore'

import { db } from '@/configs/firebase'
import {
  DocumentNotFoundError,
  FirestoreReadError,
  FirestoreWriteError
} from '@/utils'

type PaginatedResult<T> = {
  documents: (T & { id: string })[]
  lastVisible: DocumentSnapshot | null
}

const genericConverter = <T extends DocumentData>(): FirestoreDataConverter<T, T> => ({
  toFirestore: (data: WithFieldValue<T>): WithFieldValue<T> => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions): T => {
    const data = snapshot.data(options)
    return { id: snapshot.id, ...data } as unknown as T
  },
})

export const createDocument = async <T extends DocumentData>(
  collectionPath: string,
  data: WithFieldValue<T>
): Promise<string> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())
    const docRef = await addDoc(typedCollectionRef, data)
    return docRef.id
  } catch (error) {
    console.error('Create Document:', error)
    throw new FirestoreWriteError('create', error)
  }
}

export const getDocument = async <T extends DocumentData>(
  collectionPath: string,
  docId: string
): Promise<T & { id: string }> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())
    const docRef = doc(typedCollectionRef, docId)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw new DocumentNotFoundError(docId, collectionPath)
    }
    return docSnap.data() as T & { id: string }
  } catch (error) {
    console.error('Get Document:', error)
    if (error instanceof DocumentNotFoundError) throw error
    throw new FirestoreReadError('get', error)
  }
}

export const getDocuments = async <T extends DocumentData>(
  collectionPath: string,
  queryConstraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())
    const q = query(typedCollectionRef, ...queryConstraints)
    const querySnapshot = await getDocs(q)
    const documents: (T & { id: string })[] = []
    querySnapshot.forEach((docSnap) => {
      documents.push(docSnap.data() as T & { id: string })
    })
    return documents
  } catch (error) {
    console.error('Get Documents:', error)
    throw new FirestoreReadError('list', error)
  }
}

export const updateDocument = async <T extends DocumentData>(
  collectionPath: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())
    const docRef = doc(typedCollectionRef, docId)
    await updateDoc(docRef, data as UpdateData<T>)
  } catch (error) {
    console.error('Update Document:', error)
    throw new FirestoreWriteError('update', error)
  }
}

export const deleteDocument = async <T extends DocumentData>(
  collectionPath: string,
  docId: string
): Promise<void> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())
    const docRef = doc(typedCollectionRef, docId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Delete Document:', error)
    throw new FirestoreWriteError('delete', error)
  }
}

export const getPaginatedDocuments = async <T extends DocumentData>(
  collectionPath: string,
  pageSize: number,
  orderByFieldPath: string | FieldPath,
  orderDirection: OrderByDirection = 'desc',
  lastDocumentSnapshot?: DocumentSnapshot,
  queryConstraints: QueryConstraint[] = []
): Promise<PaginatedResult<T>> => {
  try {
    const typedCollectionRef = collection(db, collectionPath).withConverter(genericConverter<T>())

    let baseQuery = query(typedCollectionRef, orderBy(orderByFieldPath, orderDirection))
    baseQuery = query(baseQuery, ...queryConstraints)

    if (lastDocumentSnapshot) {
      baseQuery = query(baseQuery, startAfter(lastDocumentSnapshot))
    }

    baseQuery = query(baseQuery, limit(pageSize))

    const querySnapshot = await getDocs(baseQuery)
    const documents: (T & { id: string })[] = []
    querySnapshot.forEach((docSnap) => {
      documents.push(docSnap.data() as T & { id: string })
    })

    const lastVisible = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null

    return {
      documents,
      lastVisible: lastVisible,
    }
  } catch (error) {
    console.error('Error paginating documents:', error)
    throw new FirestoreReadError('paginated', error)
  }
}

export const whereEquals = (fieldPath: string | FieldPath, value: unknown) =>
  where(fieldPath, '==', value)
export const whereGreaterThan = (fieldPath: string | FieldPath, value: unknown) =>
  where(fieldPath, '>', value)
export const whereLessThan = (fieldPath: string | FieldPath, value: unknown) =>
  where(fieldPath, '<', value)
export const orderByField = (fieldPath: string | FieldPath, directionStr?: OrderByDirection) =>
  orderBy(fieldPath, directionStr)
export const limitResults = (limitNumber: number) => limit(limitNumber)
