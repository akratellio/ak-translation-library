import { Injectable, Output } from '@angular/core';
import { AkTLanguageType, IAkTConfiguration, AkTConfigurationDefault, IAkTPlural, IAkTTranslation, AkTTranslationDateFormat } from './ak-translation.model';
import { Subject } from 'rxjs';
import { isArray, isString } from 'util';
import * as moment_ from 'moment';
const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class AkTranslationService {
  @Output() languageChange: Subject<AkTLanguageType> = new Subject<AkTLanguageType>();
  
  private lg: AkTLanguageType;
  private translations: {[key: string]: string | IAkTPlural}[] = [];
  private showEmptyOnNotFound = false;
  private onNotFoundKeyTemplate: string;

  constructor() { 
    this.initConfig();
  }

  private initConfig(config: IAkTConfiguration = AkTConfigurationDefault) {
    Object.assign(this, config);   
  }

  private getCurrentTranslation<T extends string | IAkTPlural>(key: string): T {
    return this.translations[this.lg] ? this.translations[this.lg][key]: undefined;
  }

  private getPlural(value: IAkTPlural, plural: number): string {
    const pluralIdentifier = <string> '=' + plural.toString();
    return pluralIdentifier in value ? value[pluralIdentifier] : value['other'];
  }

  private getSubstitution(value: string, substitutions: string | string[] | { [key: string]: string }): string {
    if (isString(substitutions)) {
      substitutions = new Array(<string>substitutions);
    }

    value = isArray(substitutions) ?
      this.getSubstitutionFromArray(value, <string[]> substitutions) :
      this.getSubstitutionFromObject(value, <{ [key: string]: string }> substitutions);
    
    return this.removeMissedSubstitutions(value);
  }

  private removeMissedSubstitutions(value): string {
    return value.replace(new RegExp('\\$\{(.*?)\}'), '').trim();
  }

  private getSubstitutionFromObject(value: string, substitutions: { [key: string]: string }): string {
    Object.keys(substitutions).forEach((key: string) => value = this.replacer(value, substitutions[key], key));
    return value;
  } 

  private replacer(value: string, substitution: string, key: string | number): string {
    return value.replace('${' + key + '}', substitution);
  }

  private getSubstitutionFromArray(value: string, substitutions: string[]): string {
    for(let i=0; i<substitutions.length; i++) {
      value = this.replacer(value, substitutions[i], i);
    }
    return value;
  }

  setConfig(config?: IAkTConfiguration) {
    this.initConfig(config);
  }

  setLanguage(lg: AkTLanguageType) {
    if (lg !== this.lg) {
      this.lg = lg;
      this.emitChangeEvent(this.lg);
    }
  }

  getLanguage(): AkTLanguageType {
    return this.lg;
  }

  emitChangeEvent(lg: AkTLanguageType) {
    this.languageChange.next(lg);
  }

  addTranslation(lg: AkTLanguageType, translation: IAkTTranslation) {
    this.translations[lg] = translation;
  }

  translate(key: string, substitutions?: string | string[] | { [key: string]: string }): string {
    const value = this.getCurrentTranslation<string>(key) || undefined;
    const result = substitutions && value ? this.getSubstitution(value, substitutions) : value;
    return this.sendValue(key, result);
  }
  
  translatePlural(key: string, plural: number = 0): string {
    let value = this.getCurrentTranslation<IAkTPlural>(key);
    let result: string;
    
    if (value && (<IAkTPlural>value).other) {
      result = this.getPlural(<IAkTPlural>value, plural);
    }

    return this.sendValue(key, result);
  }

  getDateFormat(format: AkTTranslationDateFormat): string {
    return this.getCurrentTranslation(format);
  }

  getLocale(): string {
    return this.getCurrentTranslation('localeFormat');
  }

  translateDate(value: moment_.MomentInput, format: AkTTranslationDateFormat | string): string {
    const formatValue = this.getDateFormat(<AkTTranslationDateFormat>format) || format;
    const result: string =  moment(value).format(formatValue);
    return result === format ? <string>value : result;
  }

  private sendValue(key: string, value?: string): string {
    return value ? value :
      this.showEmptyOnNotFound ? undefined : 
        this.onNotFoundKeyTemplate.replace('${key}', key);
  }
  
}
