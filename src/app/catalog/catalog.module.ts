import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ListCatalogComponent } from './list-catalog/list-catalog.component';
import { CustomGridComponent } from './list-catalog/components/custom-grid/custom-grid.component';
import { CustomModalComponent } from './list-catalog/components/custom-modal/custom-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './list-catalog/components/delete-modal/delete-modal.component';
import { TBDPipe } from '../pipes/tbd.pipe';



@NgModule({
  declarations: [ListCatalogComponent, CustomGridComponent, CustomModalComponent,DeleteModalComponent, TBDPipe],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CatalogModule { }
