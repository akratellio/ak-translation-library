import { IAkTTranslation, IAkTPlural } from "../ak-translation.model";

export const AkTtranslationsMock = {
  de: <IAkTTranslation> {
    wizard: 'Zauberer',
    dwarf: 'Zwerg',
    hobbit: <IAkTPlural>{
      '=0': 'keine Halblinge',
      '=1': 'ein Halbling',
      '=2': 'zwei Halblinge',
      'other': 'viele Halblinge'
    },
    hobbitname: 'Hallo ich heiße ${0} ${1}',
    wizardname: 'Hallo ich heiße ${firstname} ${lastname}',
    dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    dateFormat: 'DD.MM.YYYY',
    localeFormat: 'de-DE' 
  },
  en: <IAkTTranslation>{
    wizard: 'wizard',
    dwarf: 'dward',
    hobbit: <IAkTPlural>{
      '=0': 'no Hobbits',
      '=1': 'one Hobbit',
      '=2': 'two Hobbits',
      'other': 'some Hobbits'
    },
    hobbitname: 'hi my name is ${0} ${1}',
    wizardname: 'hi my name is ${firstname} ${lastname}',
    dateTimeFormat: 'YYYY/MM/DD HH:mm:ss A',
    timeFormat: 'HH:mm:ss',
    dateFormat: 'YYYY/MM/DD',
    localeFormat: 'en-US'   
  }
};