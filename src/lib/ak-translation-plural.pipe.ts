import { Pipe, PipeTransform, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType } from './ak-translation.model';

@Pipe({
  name: 'akTranslationPlural',
  pure: false
})
export class AkTranslationPluralPipe implements PipeTransform {
  @Input() value: string;
  @Input() plural: number;

  constructor(private akTranslationService: AkTranslationService) {
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => {
      this.transform();
    });
  }  

  transform(value: string = this.value, plural: number = this.plural): string {
    return this.akTranslationService.translatePlural(value, plural);
  }

}
