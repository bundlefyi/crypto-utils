# @bundlefyi/crypto-utils

A collection of useful crypto utilities for react-native used by Bundle.

## Install

```javascript
npm i --save @bundlefyi/crypto-utils
```

## Mnemonic Generation

#### Description

`generateMnemonic` implements the generation of a mnemonic code (or mnemonic sentence) - a group of easy to remember words used to generate _deterministic wallets_ using [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

#### Usage

```typescript
import { generateMnemonic } from '@bundlefyi/crypto-utils';
```

```typescript
const seed = generateMnemonic(12);

console.log('->', seed);
// => seed sock milk update focus rotate barely fade car face mechanic mercy
```

#### Note

A good explanation of how to implement the key generation and wallet recovery can be found [here](https://www.youtube.com/watch?v=c8EZkeeacR0) and [here](https://medium.com/coinmonks/mnemonic-generation-bip39-simply-explained-e9ac18db9477).
