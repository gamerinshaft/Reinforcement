import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {SidebarComponent} from './sidebar.component';
import {HeroService} from './hero.service';
import {ShipmentComponent} from './shipment.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeroDetailComponent, SidebarComponent],
    providers: [HeroService]
})

@RouteConfig([
    { path: '/shipment', name: 'Shipment', component: ShipmentComponent, useAsDefault: true }
    // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class AppComponent implements OnInit {
  public title = 'Tour of Heros';
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService) { }

  getHeroes() {
      this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
