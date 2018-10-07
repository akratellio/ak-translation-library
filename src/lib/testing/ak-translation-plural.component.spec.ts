import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AkTranslationService } from '../ak-translation.service';
import { AkTtranslationsMock } from './translation-mock.spec';
import { DebugElement } from '@angular/core';
import { AkTranslationPluralComponent } from '../ak-translation-plural.component';

const translations = AkTtranslationsMock;

describe('AkTranslationPluralComponent', () => {
  let component: AkTranslationPluralComponent;
  let fixture: ComponentFixture<AkTranslationPluralComponent>;
  let service: AkTranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AkTranslationService],
      declarations: [ AkTranslationPluralComponent ]
    })
    .compileComponents();
    service = TestBed.get(AkTranslationService);
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkTranslationPluralComponent);
    component = fixture.componentInstance;    
  });

  it('should pluralize hobbit without plural input', () => {
    component.akTKey = 'hobbit';
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['de']['hobbit']['=0']);
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['en']['hobbit']['=0']);
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should pluralize hobbit with 0', () => {
    component.akTKey = 'hobbit';
    component.akTPlural = 0;
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['de']['hobbit']['=0']);
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['en']['hobbit']['=0']);
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should pluralize hobbit with 1', () => {
    component.akTKey = 'hobbit';
    component.akTPlural = 1;
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['de']['hobbit']['=1']);
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['en']['hobbit']['=1']);
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should pluralize hobbit with 2', () => {
    component.akTKey = 'hobbit';
    component.akTPlural = 2;
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['de']['hobbit']['=2']);
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['en']['hobbit']['=2']);
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should pluralize hobbit with other', () => {
    component.akTKey = 'hobbit';
    component.akTPlural = 3;
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['de']['hobbit']['other']);
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe(translations['en']['hobbit']['other']);
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should return empty string while providing non existing key', () => {
    component.akTKey = 'nonExistingKey';
    component.akTPlural = 3;
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe('');
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe('');
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

});
