# Ak-Translation Library

Ak-translation library is a small translation system, based on json.

## setup
```
npm install ak-translation-lib
```

in your root module (app.module.ts)
```javascript
import { AkTranslationModule } from 'ak-translation-lib';

@NgModule({
  ...
  imports: [
    ...,
    AkTranslationModule
  ],
  providers: [
    ...
    AkTranslationService
  ],
```
in your app component
```
...
constructor(public akTranslationService: AkTranslationService) {
  this.akTranslationService.addTranslation('de', YourTranslationJsonForDE);
  this.akTranslationService.addTranslation('en', YourTranslationJsonForEN);
  this.akTranslationService.setLanguage('en');
}
..
```

A typically translation file:

```javascript
{
  wizard: 'wizard',
  dwarf: 'dwarf',
  hobbit: {
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
```


### Standard usage
```javascript
dwarf: 'dwarf',
...
```
```html
<div>{{ ('dwarf' | akTranslation) }}</div>

<ak-translation [akTKey]="'dwarf'"></ak-translation> 
``` 

### Substitutions
#### a) string usage
```javascript
hobbitname: 'hi my name is ${0}',
...
```


```html
<span>{{ 'hobbitname' | akTranslation : 'Bilbo' }}</span>

<ak-translation [akTKey]="'hobbitname'" [akTSubstitutions]="'Bilbo'"></ak-translation>
```

#### b) array usage
```javascript
hobbitname: 'hi my name is ${0} ${1}',
...
```
    
```html
<span>{{ 'hobbitname' | akTranslation : ['Bilbo', 'Beggins'] }}</span>

<ak-translation [akTKey]="'hobbitname'" [akTSubstitutions]="['Bilbo', 'Beggins']"></ak-translation>
```

#### c) object usage
```javascript
wizardname: 'hi my name is ${firstname} ${lastname}',
...
```

```html
<span>{{ 'wizardname' | akTranslation : (firstname: 'Gandalf', lastname: 'the White'}) }}</span> 

<ak-translation [akTKey]="'wizardname'" [akTSubstitutions]="{firstname: 'Gandalf', lastname: 'the White'}"></ak-translation>
```

#### concatenation
```javascript
// en json
wizardname: 'hi my name is ${firstname} ${lastname}',
gandalfLastname: 'the White', 
// de json
wizardname: 'hallo mein Name ist ${firstname} ${lastname}',
gandalfLastname: 'der Weiße', // in de json
```

```html
<span>{{ 'wizardname' | akTranslation : ({firstname: 'Gandalf', lastname: 'gandalfLastname' | akTranslation}) }}</span> 
// en: 'hi my name is Gandalf the White'
// de: 'hallo mein Name ist Gandalf der Weiße'
<ak-translation [akTKey]="'wizardname'" [akTSubstitutions]="{firstname: 'Gandalf', lastname: 'lastnameOfGandalf' | akTranslation}"></ak-translation>
```


### Plural
``` javascript
hobbit: {
  '=0': 'no Hobbits',
  '=1': 'one Hobbit',
  '=2': 'two Hobbits',
  'other': 'some Hobbits'
},
...
```

```html
<span>{{ 'hobbit' | akTranslationPlural }}</span> // no Hobbits
<span>{{ 'hobbit' | akTranslationPlural : 0}}</span> // no Hobbits
<span>{{ 'hobbit' | akTranslationPlural : 1}}</span> // one Hobbit
<span>{{ 'hobbit' | akTranslationPlural : 2}}</span> // two Hobbit
<span>{{ 'hobbit' | akTranslationPlural : 3}}</span> // some Hobbits

<ak-translation-plural [akTKey]="'hobbit'"></ak-translation-plural>
<ak-translation-plural [akTKey]="'hobbit'" [akTPlural]="0"></ak-translation-plural>
<ak-translation-plural [akTKey]="'hobbit'" [akTPlural]="1"></ak-translation-plural>
<ak-translation-plural [akTKey]="'hobbit'" [akTPlural]="2"></ak-translation-plural>
<ak-translation-plural [akTKey]="'hobbit'" [akTPlural]="3"></ak-translation-plural>
```

### Date
``` javascript
dateTimeFormat: 'YYYY/MM/DD HH:mm:ss A',
timeFormat: 'HH:mm:ss',
dateFormat: 'YYYY/MM/DD',
...
```

```html
<span> {{ '2018-10-06T21:09:31.908Z' | akTranslationDate: 'dateTimeFormat' }}
<ak-translation-date [akTDateValue]="'2018-10-06T21:09:31.908Z'" [akTDateFormat]="'dateTimeFormat'"></ak-translation-date>
```

