import { user } from '@angular/fire/auth';
import { DataService } from './../services/data.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';

import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile: any = null;
  id: any

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
    ) {
      // this.dataService.getNotes().subscribe(res => {
      //   console.log(res)
      // });
    }

    ngOnInit() {
      this.activatedRoute.params.subscribe((data: any) =>{
        // console.log(data.id);
        this.id = data.id;
      })
    }



    async logout(){
    await this.firebaseAuthService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});

    }


}
