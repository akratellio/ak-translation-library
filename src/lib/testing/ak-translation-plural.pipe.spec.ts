import { TestBed, inject } from '@angular/core/testing';
import { AkTranslationService } from './../ak-translation.service';
import { AkTranslationPluralPipe } from './../ak-translation-plural.pipe';
import { AkTtranslationsMock } from './translation-mock.spec';

let pipe: AkTranslationPluralPipe;
let service: AkTranslationService;

const translations = AkTtranslationsMock;

describe('AkTranslationPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(inject([ AkTranslationService ], (transService: AkTranslationService) => {
    service = transService;
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    pipe = new AkTranslationPluralPipe(service);
  }));

  it('should pluralize string for english', () => {
    expect(pipe.transform('hobbit')).toBe(<string>translations.en['hobbit']['=0']);
    expect(pipe.transform('hobbit', 0)).toBe(<string>translations.en['hobbit']['=0']);
    expect(pipe.transform('hobbit', 1)).toBe(<string>translations.en['hobbit']['=1']);
    expect(pipe.transform('hobbit', 2)).toBe(<string>translations.en['hobbit']['=2']);
    expect(pipe.transform('hobbit', 3)).toBe(<string>translations.en['hobbit']['other']);
  });

  it('should pluralize string for german', () => {
    service.setLanguage('de');
    expect(pipe.transform('hobbit')).toBe(<string>translations.de['hobbit']['=0']);
    expect(pipe.transform('hobbit', 0)).toBe(<string>translations.de['hobbit']['=0']);
    expect(pipe.transform('hobbit', 1)).toBe(<string>translations.de['hobbit']['=1']);
    expect(pipe.transform('hobbit', 2)).toBe(<string>translations.de['hobbit']['=2']);
    expect(pipe.transform('hobbit', 3)).toBe(<string>translations.de['hobbit']['other']);
  });

  it('should return "void" for undefined translation', () => {
    expect(pipe.transform('noPluralAvailable')).toBeUndefined();
    expect(pipe.transform('noPluralAvailable', 0)).toBeUndefined();
    expect(pipe.transform('noPluralAvailable', 1)).toBeUndefined();
    expect(pipe.transform('noPluralAvailable', 2)).toBeUndefined();
    expect(pipe.transform('noPluralAvailable', 3)).toBeUndefined();
  }); 

});

