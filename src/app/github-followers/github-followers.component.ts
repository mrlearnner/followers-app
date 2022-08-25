import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs';
// import { Observable } from 'rxjs'; 
// import 'rxjs/add/observable/combineLatest';

import { GithubFollowersService } from './github-followers.service';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap(combine => {
            const userId = combine[0].get('id');
            const page = combine[1].get('page');
      
            // this.service.getAll({ id: id, page: page })
            return this.service.getFollowers();
        })
      ).subscribe(res => this.followers = res );
  }
}
