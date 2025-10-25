import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieList } from './serie-list/serie-list';

@NgModule({
  declarations: [
    SerieList
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SerieList
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SerieModule { }
