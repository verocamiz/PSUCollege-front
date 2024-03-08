import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCatalogComponent } from './list-catalog/list-catalog.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'list', component:ListCatalogComponent},
      {path: '**', redirectTo:'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }

