import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AkTranslationService } from '../ak-translation.service';
import { AkTtranslationsMock } from './translation-mock.spec';
import { DebugElement } from '@angular/core';
import { AkTranslationDateComponent } from '../ak-translation-date.component';

const translations = AkTtranslationsMock;

describe('AkTranslationDateComponent', () => {
  let component: AkTranslationDateComponent;
  let fixture: ComponentFixture<AkTranslationDateComponent>;
  let service: AkTranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AkTranslationService],
      declarations: [ AkTranslationDateComponent ]
    })
    .compileComponents();
    service = TestBed.get(AkTranslationService);
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkTranslationDateComponent);
    component = fixture.componentInstance;    
  });

  it('should get a translated date format', () => {
    component.akTDateValue = '2018-10-06T21:09:31.908Z';
    component.akTDateFormat = 'dateTimeFormat';
    service.languageChange.subscribe(() => {
      if (service.getLanguage() === 'de') {
        expect(fixture.elementRef.nativeElement.innerText).toBe('06.10.2018 23:09:31');
      } else {
        expect(fixture.elementRef.nativeElement.innerText).toBe('2018/10/06 23:09:31 PM');
      }
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should return date value if no such format exists', () => {
    component.akTDateValue = '2018-10-06T21:09:31.908Z';
    component.akTDateFormat = 'trööt';
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('2018-10-06T21:09:31.908Z');
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

  it('should return "invalid date" if date is corrupt', () => {
    component.akTDateValue = 'trööt';
    component.akTDateFormat = 'dateTimeFormat';
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('Invalid date');
    });
    service.setLanguage('de');
    service.setLanguage('en');
  });

});
