import { AkTranslationPipe } from './../ak-translation.pipe';
import { TestBed, inject } from '@angular/core/testing';
import { AkTranslationService } from './../ak-translation.service';
import { AkTtranslationsMock } from './translation-mock.spec';

let pipe: AkTranslationPipe;
let service: AkTranslationService;

const translations = AkTtranslationsMock

describe('AkTranslationPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(inject([ AkTranslationService ], (transService: AkTranslationService) => {
    service = transService;
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    pipe = new AkTranslationPipe(service);
  }));

  it('should transform "wizard" to "wizard", it is english, dude', () => {
    expect(pipe.transform('wizard')).toBe(<string>translations.en['wizard']);
  });

  it('should transform "wizard" to "Zauberer"', () => {
    service.setLanguage('de');
    expect(pipe.transform('wizard')).toBe(<string>translations.de['wizard']);
  });

  it('should transform "nofindable" to "void"', () => {
    expect(pipe.transform('nofindable')).toBe('');
  });

  it('should substitute into translation', () => {
    expect(pipe.transform('hobbitname', ['Bilbo', 'Baggins']))
      .toBe('hi my name is Bilbo Baggins');

    service.setLanguage('de');
    expect(pipe.transform('hobbitname', ['Bilbo', 'Beutling']))
      .toBe('Hallo ich heiße Bilbo Beutling');
  });

});
