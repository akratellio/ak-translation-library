import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AkTranslationService } from './ak-translation.service';
import { AkTLanguageType } from './ak-translation.model';

@Component({
  selector: 'ak-translation',
  template: '<ng-container></ng-container>'
})
export class AkTranslationComponent implements OnInit {
  @Input() akTKey: string;
  @Input() akTSubstitutions: string | string[] | {[key: string]: string};

  constructor (
    private akTranslationService: AkTranslationService, 
    private elementRef: ElementRef
  ) { 
    this.akTranslationService.languageChange.subscribe((lg: AkTLanguageType) => this.translate());
  }

  translate() {
    this.elementRef.nativeElement.innerText = this.akTranslationService.translate(this.akTKey, this.akTSubstitutions); 
  }

  ngOnInit() {
    this.translate();
  }

}
