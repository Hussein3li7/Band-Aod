import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import {LoginPage} from '../../pages/login/login'
 import { AngularFireDatabase,AngularFireList } from '@angular/fire/database'
 import {HomePage} from '../../pages/home/home'
 import {AngularFireAuth} from '@angular/fire/auth'
  import * as firebase from  'firebase/app'
  import { AlertController } from 'ionic-angular';
  import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the FeedBackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage {

  feedBack:'';
  
  logedinFirebase:boolean;
 // logedinFacebook:boolean;

feedbackList=this.db.list('FeedBack')
  constructor(private fb: Facebook,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public auth:AngularFireAuth,public db:AngularFireDatabase ) {
    
    let checkFirease=firebase.auth().currentUser;
    let checkFacebook;
    fb.getLoginStatus().then((res:boolean)=>{
      if(res){
        checkFacebook=true;
      }

    }).catch(er=>{
      console.log(er)
    });


    if(checkFirease || checkFacebook){ 
      this.logedinFirebase=true;
}  
    // else if(checkFacebook){ 
    //   this.logedinFirebase=true;
    // } 
    else{
      this.logedinFirebase=false;
      this.navCtrl.push(LoginPage)
    }

    // fb.getLoginStatus().then(checkFacebook=>{
    //     if(checkFacebook){
    //   this.logedinFirebase=true;
    // }
    //  else{
    //   this.logedinFirebase=false;
    //   this.navCtrl.push(LoginPage)
    // }
    // }).catch(err=>{
    //   console.log(err)
    // })
//     fb.getLoginStatus().then(res=>{
// if(res.status=="connected"){
//   this.logedin=true
// }else{
//   this.logedin=false
//   this.navCtrl.push(LoginPage)
// }


//     })

  //   firebase.auth().onAuthStateChanged(userr=>{
  //     if(userr){
  //       this.logedinFirebase=true;
  //     }
  //     else{ 
  //      this.logedinFirebase=false;
  //     this.navCtrl.push(LoginPage)
  //     }
  // })
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedBackPage');
  }



  getFeedBack(){
    this.feedbackList.push(this.feedBack).then(()=>{
 this.showAlert();
    })
    
    let emptyFiled=document.getElementsByClassName('feed') as HTMLCollectionOf<HTMLInputElement>
    emptyFiled[0].value="";
  }


  logut(){
    this.showConfirm()
    // this.auth.auth.signOut().then(()=>{
    //   this.navCtrl.setRoot(HomePage)
    // })
  }



  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'تسجيل الخروج ؟',
      buttons: [
        {
          text: 'لا',
          handler: () => {
            return;
          }
        },
        {
          text: 'نعم',
          handler: () => {
 
            let facebookUser=this.fb.getLoginStatus();

            let fireBaseuser=firebase.auth().currentUser;

            try
            {
                if(fireBaseuser){
                  this.auth.auth.signOut().then(()=>{
              this.navCtrl.setRoot(HomePage)
            })
            }else  if(facebookUser){
              this.fb.logout().then(()=>{
                 this.navCtrl.setRoot(HomePage)
              })        
            }

            }
          catch(err){
console.log(err)
          }

          }
        }
      ]
    });
    confirm.present();
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'شكرا لك',
      subTitle: 'شكرا لك على ملاحظاتك ',
      buttons: ['OK']
    });
    alert.present();
  }

}
