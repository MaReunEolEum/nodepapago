import Translator from "nodePapago";

(async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
(async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();