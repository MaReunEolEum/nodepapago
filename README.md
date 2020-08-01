# nodepapago - Unofficial papago translator.

Note: It can stop working anytime.

## Install

```
npm install nodepapago
```

## Example

### Single

```typescript
import Translator from "nodepapago";

(async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
```

### Multi
```typescript
import Translator from "nodepapago";

(async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
```

## License
It is following MIT License.

## Special Thanks
Beomi([pypapago](https://github.com/Beomi/pypapago))