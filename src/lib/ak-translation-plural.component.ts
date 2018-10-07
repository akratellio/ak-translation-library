import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType } from './ak-translation.model';

@Component({
  selector: 'ak-translation-plural',
  template: '<ng-container></ng-container>'
})
export class AkTranslationPluralComponent implements OnInit {
  @Input() akTKey: string;
  @Input() akTPlural: number;

  constructor (
    private akTranslationService: AkTranslationService, 
    private elementRef: ElementRef
  ) { 
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => this.translate());
  }

  translate() {
    this.elementRef.nativeElement.innerText = this.akTranslationService.translatePlural(this.akTKey, this.akTPlural) || ''; 
  }

  ngOnInit() {
    this.translate();
  }

}
