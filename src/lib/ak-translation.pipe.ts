import { Pipe, PipeTransform, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType } from './ak-translation.model';

@Pipe({
  name: 'akTranslation',
  pure: false
})
export class AkTranslationPipe implements PipeTransform {
  @Input() value: string;
  @Input() substitutions: string | string[];

  constructor(private akTranslationService: AkTranslationService) {
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => {
      this.transform();
    });
  }

  transform(value: string = this.value, substitutions: string | string[] = this.substitutions): string | void {
    return this.akTranslationService.translate(value, substitutions) || '';
  }

}
