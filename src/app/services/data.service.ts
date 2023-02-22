import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,

    ) { }

    getUserProfile() {
      const user = this.auth.currentUser;
      const userDocRef = doc(this.firestore, `users/S{user.uid}`);
      return docData(userDocRef);
    }

  getNotes() {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef)
  }
}
