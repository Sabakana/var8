import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddComponent } from './add/add.component';
import { GuestComponent } from './guest/guest.component';


const routes: Routes = [
  {path:"main",component:MainComponent},
  {path:"catalog",component:CatalogComponent},
  {path:"add",component:AddComponent},
  {path:"guest/:id",component:GuestComponent},
  {path:"**",redirectTo:"/main"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],// доступ к роутингу для всех компонентов
  exports: [RouterModule]
})
export class AppRoutingModule { }


// Массив route содержит объекты, с полем path и component,
// которые указывают на соответствие ссылки компоненту.
// Если в ссылке требуется передать параметр, то он записывается через /: 