import { AkTranslationDatePipe } from './../ak-translation-date.pipe';
import { AkTranslationService, AkTLanguageType, AkTTranslationDateFormat } from '../../public_api';
import { AkTtranslationsMock } from './translation-mock.spec';
import { inject } from '@angular/core/testing';

let pipe: AkTranslationDatePipe;
let service: AkTranslationService;

const translations = AkTtranslationsMock
describe('AkTranslationDatePipe', () => {
  beforeEach(inject([ AkTranslationService ], (transService: AkTranslationService) => {
    service = transService;
    service.addTranslation('de', translations.de);
    service.addTranslation('en', translations.en);
    pipe = new AkTranslationDatePipe(service);
  }));

  it('create an instance', () => {
    const pipe = new AkTranslationDatePipe(service);
    expect(pipe).toBeTruthy();
  });

  it('should get a translated date format', () => {
    const lg: AkTLanguageType = 'de';
    const date = '2018-10-06T21:09:31.908Z';
    const format: AkTTranslationDateFormat = 'dateTimeFormat';
    service.setLanguage(lg);
    expect(pipe.transform(date, format)).toBe('06.10.2018 23:09:31');
  });

  it('should return date value if no such format exists', () => {
    const lg: AkTLanguageType = 'de';
    const date = '2018-10-06T21:09:31.908Z';
    const format: string = 'trööt';
    service.setLanguage(lg);
    expect(pipe.transform(date, format)).toBe('2018-10-06T21:09:31.908Z');
  });

  it('should return "invalid date" if date is corrupt', () => {
    const lg: AkTLanguageType = 'de';
    const date = 'trööt';
    const format: AkTTranslationDateFormat = 'dateTimeFormat'; 
    service.setLanguage(lg); 
    expect(pipe.transform(date, format)).toBe('Invalid date'); 
  });
});
