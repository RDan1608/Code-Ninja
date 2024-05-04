import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-colorhighlight',
  templateUrl: './colorhighlight.component.html',
  styleUrls: ['./colorhighlight.component.scss']
})
export class ColorhighlightComponent implements OnInit {
  constructor( private route: ActivatedRoute,private router: Router) {}

userId!: string;
ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.userId = params['userId'];
    window.localStorage.setItem('userId', this.userId);
    });
  }





}
