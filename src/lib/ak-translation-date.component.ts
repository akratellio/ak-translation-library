import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType, AkTTranslationDateFormat } from './ak-translation.model';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'ak-translation-date',
  template: '<ng-container></ng-container>'
})
export class AkTranslationDateComponent implements OnInit {
  @Input() akTDateValue: moment_.MomentInput;
  @Input() akTDateFormat: AkTTranslationDateFormat | string;

  constructor (
    private akTranslationService: AkTranslationService, 
    private elementRef: ElementRef
  ) { 
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => this.translate());
  }

  translate() {
    this.elementRef.nativeElement.innerText = this.akTranslationService.translateDate(this.akTDateValue, this.akTDateFormat); 
  }

  ngOnInit() {
    this.translate();
  }

}
