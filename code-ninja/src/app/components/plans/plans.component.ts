import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit  {
  plansData: any = []
  userId!: string;
  userSubscribedPlans = [];
  User!: string;
  formularioRegistro = new FormGroup({
    id : new FormGroup(''),
    nombre: new FormControl('',),
    precio: new FormControl('',),
    caracteristicas: new FormControl(''),
  })
  userData: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,private router: Router) {}
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.userId = params['userId'];
    this.fetchUserPlans();
    this.fetchUserData(this.userId)
    });
  } 

  fetchUserData(userId: string): void {
    // Make an HTTP GET request to your backend API to fetch user data
    this.httpClient.get('http://localhost:8888/usuarios/'+ userId)
      .subscribe(
        (userData: any) => {
          this.userData = userData;
          this.userSubscribedPlans=userData.planId
          this.User= userData._id
          console.log(userData);
          console.log(this.userSubscribedPlans);
          console.log(this.User);
        },
        error => {
          console.error(error);
        }
      );
  }  




  fetchUserPlans(): void {
    this.httpClient.get('http://localhost:8888/planes')
      .subscribe(
        (plansData: any) => {
          this.plansData = plansData;
          console.log(plansData);
          this.formularioRegistro.patchValue({
            id: this.plansData._id,
            nombre: this.plansData.nombre,
            precio: this.plansData.precio,
          });
          
          console.log(this.formularioRegistro);
        },
        error => {
          console.error(error);
        }
      );
 }  
}
