import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ListCatalogComponent } from './list-catalog/list-catalog.component';
import { CustomGridComponent } from './list-catalog/components/custom-grid/custom-grid.component';
import { CustomModalComponent } from './list-catalog/components/custom-modal/custom-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListCatalogComponent, CustomGridComponent, CustomModalComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CatalogModule { }
