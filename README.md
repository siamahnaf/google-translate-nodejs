# google-translate-nodejs
A nodejs package for translating text using google translate for free! It also support batching translation!

## Introduction

A Node.js package for translating text using Google Translate for free, with support for batching translation, involves several steps. Below is a detailed guide on how you can achieve this using the google-translate-nodejs package.

## Support Me

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Features

- Fast and lightweight
- Batching translation. You can translate one text to many target language at a time.
- No unnecessary Dependencies
- Small in Size (12KB)

## Installing

Using npm

```bash
$ npm install google-translate-nodejs
```

## Batch Translation Example

```bash
import { translate } from "google-translate-nodejs";

const { data } = await translate.batch("How are you", ["bn", "fr", "en", "es", "de", "ar", "ja", "ko", "ru", "pt", "it", "hi", "zh", "tr", "nl", "sv", "pl", "vi", "th"]
        );
console.log(data);

//And result will be printed like-

{
  source: { lan: 'auto', text: 'How are you' },
  target: [
    { lan: 'bn', text: 'আপনি কেমন আছেন' },
    { lan: 'fr', text: 'Comment vas-tu' },
    { lan: 'en', text: 'How are you' },
    { lan: 'es', text: 'Cómo estás' },
    { lan: 'de', text: 'Wie geht es dir' },
    { lan: 'ar', text: 'كيف حالك' },
    { lan: 'ja', text: '元気ですか' },
    { lan: 'ko', text: '어떻게 지내세요' },
    { lan: 'ru', text: 'Как вы' },
    { lan: 'pt', text: 'Como vai' },
    { lan: 'it', text: 'Come stai' },
    { lan: 'hi', text: 'आप कैसे हैं?' },
    { lan: 'zh', text: '你好吗' },
    { lan: 'tr', text: 'Nasılsın' },
    { lan: 'nl', text: 'Hoe is het' },
    { lan: 'sv', text: 'Hur mår du' },
    { lan: 'pl', text: 'Jak się masz' },
    { lan: 'vi', text: 'Bạn có khỏe không' },
    { lan: 'th', text: 'คุณเป็นอย่างไร' }
  ]
}

//For typescript you can import Response Types also-
import { BatchResponse } from "google-translate-nodejs";
```

## API For Batch Translations-

### translate.batch(text, targetLanguages, options)

#### text
Type: `String`
Description: The main text which need to be translated

#### targetLanuages
Type: `String[]` `(String array)`
Description: A array of string with lanuage code

#### options
Type: `Object`
Description: Options Object (Optional)

##### from
Type: `String`
Description: From Language
Default: `auto`


## Single Translation Example

```bash
import { translate } from "google-translate-nodejs";

const { data } = await translate.single("How are you", "fr");
console.log(data);

//And result will be printed like-
{
  source: { lan: 'auto', text: 'How are you?' },
  target: { lan: 'fr', text: 'Comment vas-tu?' }
}

//For typescript you can import Response Types also-
import { SingleResponse } from "google-translate-nodejs";
```

## API For Single Translations-

### translate.single(text, targetLanguage, options)

#### text
Type: `String`
Description: The main text which need to be translated

#### targetLanuage
Type: `String`
Description: The target lanuage code

#### options
Type: `Object`
Description: Options Object (Optional)

##### from
Type: `String`
Description: From Language
Default: `auto`

## Issues or correction
If you face any issues to any function, please let me know by creating a issue on github.

## Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Twitter - [https://twitter.com/siamahnaf198](https://twitter.com/siamahnaf198)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)

## License

Released under [__MIT license__](https://opensource.org/licenses/MIT).