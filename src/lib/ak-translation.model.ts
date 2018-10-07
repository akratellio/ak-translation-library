export type AkTLanguageType = 'de' | 'en' | 'fr';

export interface IAkTConfiguration {
  lg?: AkTLanguageType,
  showEmptyOnNotFound?: boolean;
  onNotFoundKeyTemplate?: string;
}

export const AkTConfigurationDefault = <IAkTConfiguration> {
  lg: 'en',
  showEmptyOnNotFound: true,
  onNotFoundKeyTemplate: 'AKTRANSLATION_OF_${key}_NOT_FOUND'
};

export interface IAkTPlural {
  '=0'?: string;
  '=1': string;
  '=2'?: string;
  '=3'?: string;
  '=4'?: string;
  'other': string;
}

export type AkTTranslationDateFormat = 'dateTimeFormat' | 'timeFormat' | 'dateFormat';

export interface IAkTTranslation {  
  dateTimeFormat?: string;
  timeFormat?: string;
  dateFormat?: string;
  localeFormat?: string;
  [key: string]: string | IAkTPlural;
}