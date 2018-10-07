import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AkTranslationComponent } from './../ak-translation.component';
import { AkTranslationService } from '../ak-translation.service';
import { AkTtranslationsMock } from './translation-mock.spec';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from "@angular/platform-browser";

const translations = AkTtranslationsMock;

describe('AkTranslationComponent', () => {
  let component: AkTranslationComponent;
  let fixture: ComponentFixture<AkTranslationComponent>;
  let service: AkTranslationService;
  let ksComponentElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AkTranslationService],
      declarations: [ AkTranslationComponent ]
    })
    .compileComponents();
    service = TestBed.get(AkTranslationService);
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkTranslationComponent);
    component = fixture.componentInstance;    
  });

  it('should translate wizard to de', () => {
    component.akTKey = 'wizard';
    service.setLanguage('de');
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.innerText).toBe('Zauberer');
  });

  it('should translate wizard to en', () => {
    component.akTKey = 'wizard';
    service.setLanguage('en');
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.innerText).toBe('wizard');
  });

  it('should substitute hobbitname via string to de', () => {
    component.akTKey = 'hobbitname';
    component.akTSubstitutions = 'Bilbo';
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('Hallo ich heiße Bilbo');
    });
    service.setLanguage('de');
  });

  it('should substitute hobbitname via string to en', () => {
    component.akTKey = 'hobbitname';
    component.akTSubstitutions = 'Bilbo';
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('hi my name is Bilbo');
    });
    service.setLanguage('en');    
  });

  it('should substitute hobbitname via array to en', () => {
    component.akTKey = 'hobbitname';
    component.akTSubstitutions = ['Bilbo', 'Baggins'];
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('hi my name is Bilbo Baggins');
    });
    service.setLanguage('en');    
  });

  it('should substitute wizardname via object to en', () => {
    component.akTKey = 'wizardname';
    component.akTSubstitutions = { firstname: 'Gandalf', lastname: 'the White' };
    service.languageChange.subscribe(() => {
      expect(fixture.elementRef.nativeElement.innerText).toBe('hi my name is Gandalf the White');
    });
    service.setLanguage('en');    
  });
});
