import { FirebaseAuthService } from './../providers/firebase-auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Console } from 'console';
import { user, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;
  users: any

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: FirebaseAuthService,
    private router: Router,
    private auth: Auth,
  ) { }

  //Facil acesso para campos de formularios
  get email() {
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log(this.credentials.value);
    console.log(user);

  }

  //Login pelo GOOGLE



    //REGISTER
  async register()  {
    const loading = await this.loadingController.create();
    await loading.present();

    console.log(this.credentials);

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    console.log(user);

    if(user){

     this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      this.showAlert('Registro Falhou', 'Tente novamente!');
    }
  }


  //LOGIN
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user){
      this.users = user;
      console.log(this.users.value.uid);
      const id = this.credentials.value.email;
      this.router.navigate(['home/' + id]);

    }else{
      this.showAlert('Login Falhou', 'Tente novamente!');
    }
  }



  async showAlert(header: any, message: any)  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });
    await alert.present();
  }

}
