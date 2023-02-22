import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword }from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private auth: Auth,
    ) { }

  async register(data: { email: string; password: string; }) {
      try{
        const user = await createUserWithEmailAndPassword(
          this.auth,
          data.email,
          data.password
        );
      return user;
        }catch (e) {
          console.log('Erro');
          return null;

        }
    }
    async login(data: { email: string; password: string; }) {
      try{
        const user = await signInWithEmailAndPassword(
          this.auth,
          data.email,
          data.password
        );
      return user;
        }catch (e) {
          return null;
        }
    }

    logout() {
      return signOut(this.auth)
    }
}
