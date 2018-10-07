import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkTranslationPipe } from './ak-translation.pipe';
import { AkTranslationPluralPipe } from './ak-translation-plural.pipe';
import { AkTranslationComponent } from './ak-translation.component';
import { AkTranslationPluralComponent } from './ak-translation-plural.component';
import { AkTranslationService } from './ak-translation.service';
import { AkTranslationDatePipe } from './ak-translation-date.pipe';
import { AkTranslationDateComponent } from './ak-translation-date.component';

const moduleChildren = [
  AkTranslationPipe, 
  AkTranslationPluralPipe,
  AkTranslationComponent,
  AkTranslationPluralComponent,
  AkTranslationDatePipe,
  AkTranslationDateComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: moduleChildren,
  exports: moduleChildren
})
export class AkTranslationModule { }
