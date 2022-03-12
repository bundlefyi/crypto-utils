# @getcollect/crypto-utils

A collection of useful crypto utilities for react-native used by Collect wallet.

### Install

```javascript
npm i --save @getcollect/crypto-utils
```

### Mnemonic Generation

`generateMnemonic` implements the generation of a mnemonic code -- a group of easy to remember words used to generate deterministic wallets using BIP-39.

#### Usage

```typescript
import { generateMnemonic } from '@getcollect/crypto-utils';
```

```typescript
const seed = generateMnemonic();
console.log(seed); // seed sock milk update focus rotate barely fade car face mechanic mercy
```
