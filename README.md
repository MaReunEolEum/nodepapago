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
// Expected output: 안녕
```

### Multi

```typescript
import Translator from "nodepapago";

(async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
// Expected output: ["사과", "바나나", "주황색의", "컴퓨터", "노트북", "핸드폰", "학교", "약속하다"]
```

## License
It is following MIT License.

## Special Thanks
Beomi([pypapago](https://github.com/Beomi/pypapago))