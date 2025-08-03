export class FirestoreBaseError extends Error {
  public code: string
  public cause?: unknown

  constructor(message: string, code: string, originalError?: unknown) {
    super(message)
    this.name = 'FirestoreBaseError'
    this.code = code

    if (originalError instanceof Error) {
      this.stack += '\nCaused by: ' + originalError.stack
      this.cause = originalError
    } else if (typeof originalError === 'string') {
      this.cause = new Error(originalError)
    }
  }
}

export class DocumentNotFoundError extends FirestoreBaseError {
  constructor(docId: string, collectionPath: string, originalError?: unknown) {
    const message = `Document with ID "${docId}" not found in collection "${collectionPath}".`
    super(message, 'firestore/document-not-found', originalError)
    this.name = 'DocumentNotFoundError'
  }
}

type WriteOperation = 'create' | 'update' | 'delete'
type ReadOperation = 'get' | 'list' | 'query'

export class FirestoreWriteError extends FirestoreBaseError {
  constructor(operation: WriteOperation | string, originalError?: unknown) {
    const message = `Failed to ${operation} data to Firestore.`
    super(message, 'firestore/write-failed', originalError)
    this.name = 'FirestoreWriteError'
  }
}

export class FirestoreReadError extends FirestoreBaseError {
  constructor(operation: ReadOperation | string, originalError?: unknown) {
    const message = `Failed to ${operation} data from Firestore.`
    super(message, 'firestore/read-failed', originalError)
    this.name = 'FirestoreReadError'
  }
}

export class InvalidDataError extends FirestoreBaseError {
  constructor(details: string, originalError?: unknown) {
    const message = `Data validation failed: ${details}`
    super(message, 'firestore/invalid-data', originalError)
    this.name = 'InvalidDataError'
  }
}
