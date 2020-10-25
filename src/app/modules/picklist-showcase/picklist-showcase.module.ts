import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PicklistComponent } from '../../shared/components/picklist.component';
import { PicklistFilterPipe } from '../../shared/pipes/picklist-filter.pipe';
import { PicklistShowcaseComponent } from './components/picklist-showcase.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PicklistShowcaseComponent,
    PicklistComponent,
    PicklistFilterPipe
  ],
  exports: [
    PicklistShowcaseComponent,
  ]
})
export class PicklistShowcaseModule {
}
