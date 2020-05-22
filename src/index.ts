import express from 'express';
import initTranslate from '@pabra/tongue-translate';
import { isKeyof } from './utils';
import entries from '../tongue_entries.json';
import en from '../tongue_en.json';
import de from '../tongue_de.json';
import es from '../tongue_es.json';

const app = express();
app.use(express.static('public'));
const port = 8080;
const dicts = { en, de, es } as const;
const { translate } = initTranslate(entries, dicts);

app.get('/api/:lang/greet/:name?', (req, res) => {
  const { lang, name } = req.params;
  // ensure we will pass a known language to translate
  // try to change the fallback language "en" to "fr"
  const translateLang = isKeyof(dicts, lang) ? lang : 'en';
  //                                                  ^^^^ fallback language

  if (name) {
    // note that the translation of "greeting" requires the 3rd argument to be
    // an object with "name" as key and a string as value
    // try to add a typo -> change 3rd argument `{ name: name }` to `{ Name: name }` (capital N in key name)
    // try to remove the 3rd argument of the translate function
    // try to add a typo -> change "greeting" to "greting" (remomve one "e")
    res.send(translate(translateLang, 'greeting', { name: name }));
  } else {
    // note that `translate` cannot have a 3rd argument if 2nd arg is "hello world"
    // try to add an empty object as 3rd arguemnt
    res.send(translate(translateLang, 'hello world'));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
