import { TestBed } from '@angular/core/testing';
import { AkTranslationService } from './../ak-translation.service';
import { 
  AkTConfigurationDefault, 
  AkTLanguageType, 
  IAkTConfiguration } from './../ak-translation.model';
import { AkTtranslationsMock } from './translation-mock.spec';
import { AkTTranslationDateFormat } from '../ak-translation.model';

let service: AkTranslationService;
const translations = AkTtranslationsMock;

describe('AkTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AkTranslationService);
  });

  it('should get the default language while not changed', () => {
    expect(service.getLanguage()).toBe('en');
  });

  it('should return undefined while translation missing', () => {
    expect(service.translate('wizard')).toBeUndefined();
  });

  it('should return undefined while translation missing', () => {
    expect(service.translate('wizard')).toBeUndefined();
  });

  it('should return empty string notification while translation missing', () => {
    service.setConfig(<IAkTConfiguration>{
      showEmptyOnNotFound: false,
      onNotFoundKeyTemplate: 'AKTRANSLATION_OF_${key}_NOT_FOUND'
    });
    expect(service.translate('wizard')).toBe('AKTRANSLATION_OF_wizard_NOT_FOUND');
  });

  it('should set a custom config', () => {
    service.setConfig(<IAkTConfiguration>{lg: 'de'});
    expect(service.getLanguage()).toBe('de');
  });

  it('should get ask for a specific translation', () => {
    service.setLanguage('de');
    expect(service.getLanguage()).toBe('de');
  });

  it('should have changed the default language', () => {
    expect(service.getLanguage()).toBe(AkTConfigurationDefault.lg);
    service.setLanguage('de');
    expect(service.getLanguage()).toBe('de');
  });

  it('should emit the language change event', () => {
    const newLanguage = 'de';    
    service.languageChange.subscribe((language: AkTLanguageType) => {
      expect(language).toBe(newLanguage);
    });
    service.setLanguage(newLanguage); 
  });

  it('should not emit the language change event while language did not change', () => {
    const newLanguage = service.getLanguage();
    spyOn(service.languageChange, 'next');
    service.setLanguage(newLanguage); 
    expect(service.languageChange.next).not.toHaveBeenCalled();
  });

  it('should check a translation for de language',() => {
    const lg: AkTLanguageType = 'de';
    const key = 'dwarf';
    const translatedKey = <string>translations[lg][key];
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((language: AkTLanguageType) => {
      expect(language).toBe(lg);
      expect(service.translate(key)).toBe(translatedKey);
    });
    service.setLanguage(lg);
  });

  it('should check a translation for en language',() => {
    const lg: AkTLanguageType = 'en';
    const key = 'dwarf';
    const nonExistKey = 'oakenchild';
    const translatedKey = <string>translations[lg][key];
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((language: AkTLanguageType) => {
      expect(language).toBe(lg);
      expect(service.translate(key)).toBe(translatedKey);
      expect(service.translate(nonExistKey)).toBeUndefined();
    });
    service.setLanguage(lg);
  });

  it('should translate plural', () => {
    const lg: AkTLanguageType = 'de';
    const key = 'hobbit';
    const nonExistKey = 'oakenchild';
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((lg: AkTLanguageType) => {
      // translate existing keys
      expect(service.translatePlural(key)).toBe(translations[lg][key]['=0']);
      expect(service.translatePlural(key, 0)).toBe(translations[lg][key]['=0']);
      expect(service.translatePlural(key, 1)).toBe(translations[lg][key]['=1']);
      expect(service.translatePlural(key, 2)).toBe(translations[lg][key]['=2']);
      expect(service.translatePlural(key, 3)).toBe(translations[lg][key]['other']);

      // translate non existing keys, undefined
      expect(service.translatePlural(nonExistKey)).toBeUndefined();
      expect(service.translatePlural(nonExistKey, 0)).toBeUndefined();
      expect(service.translatePlural(nonExistKey, 1)).toBeUndefined();
      expect(service.translatePlural(nonExistKey, 2)).toBeUndefined();
      expect(service.translatePlural(nonExistKey, 3)).toBeUndefined();
    });
    service.setLanguage(lg);
  });

  it('should substitute the hobbits name, by string parameter', () => {
    const lg: AkTLanguageType = 'de';
    const key1 = 'hobbitname';
    const key2 = 'wizard';
    const expectedText2 = 'Zauberer';
    const expectedText3 = 'Hallo ich heiße Bilbo';
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((lg: AkTLanguageType) => {
      // Hallo ich heiße Bilbo Beutlin
      expect(service.translate(key1, 'Bilbo')).toBe(expectedText3);
      expect(service.translate(key2, 'Bilbo')).toBe(expectedText2);
    });
    service.setLanguage(lg);
  });

  it('should substitute the hobbits name by array parameter', () => {
    const lg: AkTLanguageType = 'de';
    const key1 = 'hobbitname';
    const key2 = 'wizard';
    const expectedText1 = 'Hallo ich heiße Bilbo Beutlin';
    const expectedText2 = 'Zauberer';
    const expectedText3 = 'Hallo ich heiße Bilbo';
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((lg: AkTLanguageType) => {
      // Hallo ich heiße Bilbo Beutlin
      expect(service.translate(key1, ['Bilbo', 'Beutlin'])).toBe(expectedText1);
      expect(service.translate(key1, ['Bilbo', 'Beutlin', 'Saruman'])).toBe(expectedText1);
      // Hallo ich heiße Bilbo
      expect(service.translate(key1, ['Bilbo'])).toBe(expectedText3);
      // Zauberer
      expect(service.translate(key2, ['Bilbo', 'Beutlin'])).toBe(expectedText2);
    });
    service.setLanguage(lg);
  });

  it('should substitute the hobbits name by object parameter', () => {
    const lg: AkTLanguageType = 'de';
    const key1 = 'wizardname';
    const key2 = 'wizard';
    const expectedText1 = 'Hallo ich heiße Gandalf der Weiße';
    const expectedText2 = 'Zauberer';
    const expectedText3 = 'Hallo ich heiße Gandalf';
    const expectedText4 = 'Hallo ich heiße  der Weiße';
    service.addTranslation(lg, translations[lg]);
    service.languageChange.subscribe((lg: AkTLanguageType) => {
      // Hallo ich heiße Bilbo Beutlin
      expect(service.translate(key1, { 
        firstname: 'Gandalf', 
        lastname: 'der Weiße' 
      })).toBe(expectedText1);

      expect(service.translate(key1, {
        firstname: 'Gandalf', 
        lastname: 'der Weiße', 
        wrongname: 'Saruman' 
      })).toBe(expectedText1);

      expect(service.translate(key1, { firstname: 'Gandalf' })).toBe(expectedText3);
      expect(service.translate(key1, { lastname: 'der Weiße' })).toBe(expectedText4);

      expect(service.translate(key2, { firstname: 'Gandalf' })).toBe(expectedText2);
    });
    service.setLanguage(lg);
  });

  it('should get a translated date format', () => {
    const lg: AkTLanguageType = 'en';
    const date = '2018-10-06T21:09:31.908Z';
    const format: AkTTranslationDateFormat = 'dateTimeFormat';
    service.addTranslation(lg, translations[lg]);
    expect(service.translateDate(date, format)).toBe('2018/10/06 23:09:31 PM');
  });

  it('should return date value if no such format exists', () => {
    const lg: AkTLanguageType = 'en';
    const date = '2018-10-06T21:09:31.908Z';
    const format: string = 'trööt';
    service.addTranslation(lg, translations[lg]);
    expect(service.translateDate(date, format)).toBe('2018-10-06T21:09:31.908Z');
  });

  it('should return "invalid date" if date is corrupt', () => {
    const lg: AkTLanguageType = 'en';
    const date = 'trööt';
    const format: AkTTranslationDateFormat = 'dateTimeFormat';    
    service.addTranslation(lg, translations[lg]);
    expect(service.translateDate(date, format)).toBe('Invalid date');
  });
});
