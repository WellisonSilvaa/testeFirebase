import { Auth } from '@angular/fire/auth';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Router } from '@angular/router';
import { HelperService } from './../providers/helper.service';
import { LOGIN, SIGNUP } from './../constrants/formValidationMessage';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  credentials!: FormGroup;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = SIGNUP;

  constructor(
    private helperService: HelperService,
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.createFormControl();
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log(this.credentials.value);
    // console.log(user);
    // this.createForm();
  }
  get email() {
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }


  async register()  {
    const loading = await this.loadingController.create();
    await loading.present();

    console.log(this.credentials.value);

    const user = await this.firebaseAuthService.register(this.credentials.value);
    await loading.dismiss();

    console.log(user);

    if(user){
      this.router.navigateByUrl('/folder',);
    }else{
      this.showAlert('Registro Falhou', 'Tente novamente!');
    }
  }


  goToLoginPage() {
    this.router.navigate(['../login']);
  }


  createFormControl() {
    this.credentials.value.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.credentials.value.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  // createForm() {
  //   this.credentials = new FormGroup({
  //     email: this.email,
  //     password: this.password
  //   });
  // }
    // console.log(this.credentials.value);
    // this.credentials.valueChanges.subscribe(data => this.onFormValueChanged(data))

  // onFormValueChanged(data: any){
  //   this.formError = this.helperService.prepareValidationMessage(this.credentials, this.validationMessage, this.formError);
  // }

  async showAlert(header: any, message: any)  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });
    await alert.present();
  }

}
