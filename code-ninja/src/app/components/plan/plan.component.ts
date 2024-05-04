import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  @Input() planData: any;
  @Input() userSubscribedPlans: string[] = []; // Recibe el arreglo userSubscribedPlans del componente padre
  @Input() User!: string;
  planid!: string;
   constructor(private httpClient: HttpClient) {}

  isSubscribed(planId: string): boolean {
    return this.userSubscribedPlans.includes(planId);
  }

  subscribeOrUnsubscribe(planId: string): void {
      this.planid=this.planData.planId;
      console.log(planId);
    this.httpClient.put('http://localhost:8888/usuarios/' + this.User,{planId})
    .subscribe(
      (userData: any) => {
        console.log(userData)
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
}
}
