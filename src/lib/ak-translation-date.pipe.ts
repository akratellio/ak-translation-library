import { Pipe, PipeTransform, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType, AkTTranslationDateFormat } from './ak-translation.model';
import { DatePipe, formatDate } from '@angular/common';
import * as moment_ from 'moment';
const moment = moment_;

@Pipe({
  name: 'akTranslationDate',
  pure: false
})
export class AkTranslationDatePipe implements PipeTransform {
  @Input() value: moment_.MomentInput;
  @Input() format: AkTTranslationDateFormat | string;

  constructor(private akTranslationService: AkTranslationService) {
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => {
      this.transform();
    });
  } 

  transform(value: moment_.MomentInput = this.value, format: AkTTranslationDateFormat | string = this.format): string {
    return this.akTranslationService.translateDate(value, format);
  }

}
