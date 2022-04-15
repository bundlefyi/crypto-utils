/**
 * Creates a BIP39 mnemonic sentence.
 *
 * https://github.com/bitcoinjs/bip39
 * https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
 *
 * Stanford Javascript Crypto Library (SJCL)
 * https://bitwiseshiftleft.github.io/sjcl/
 * https://github.com/bitwiseshiftleft/sjcl/
 */
import randomBytes from 'randombytes-pure';
import { createHash } from 'sha256-uint8array';
import { assert } from '../utils/assert';
import DEFAULT_WORDLIST from './wordlist/bip39-en';

type WordCount = 12 | 15 | 18 | 21 | 24;

type Entropy = { [key: number]: number };

const enum Errors {
  INVALID_ENTROPY = 'invalid entropy',
  INVALID_WORD_COUNT = 'invalid word count'
}

// Entropy is encoded in a multiple of 32bits. With more
// entropy security is improved but the sentence length increases
const StrengthMap: Entropy = {
  12: 16 * 8,
  15: 20 * 8,
  18: 24 * 8,
  21: 28 * 8,
  24: 32 * 8
};

function binaryToByte(bin: string): number {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes: number[]): string {
  return bytes.map((n) => n.toString(2).padStart(8, '0')).join('');
}

function deriveChecksumBits(entropyBuffer: Uint8Array): string {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = createHash('sha256').update(entropyBuffer).digest();

  return bytesToBinary(Array.from(hash)).slice(0, CS);
}

function entropyToMnemonic(entropy: Uint8Array): string {
  const entropyBits = bytesToBinary(Array.from(entropy));
  const checksumBits = deriveChecksumBits(entropy);

  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/.{1,11}/g)!;

  return chunks
    .map((binary: string): string => {
      const index = binaryToByte(binary);
      return DEFAULT_WORDLIST[index];
    })
    .join(' ');
}

// Return a `Uint8Array` with the specified length
// filled with random bytes.
function randomUIntArray(length = 32): Uint8Array {
  // Create a typed array of 8-bit unsigned integers
  return new Uint8Array(randomBytes(length));
}

/**
 * Mnemonic generation of deterministic keys.
 * Follows BIP39 implementation https://github.com/bitcoinjs/bip39
 */
export function generateMnemonic(wordCount: WordCount = 12): string {
  assert(StrengthMap.hasOwnProperty(wordCount), Errors.INVALID_WORD_COUNT);

  const strength = StrengthMap[wordCount] ?? 128;

  assert(strength % 32 === 0, Errors.INVALID_ENTROPY);

  return entropyToMnemonic(randomUIntArray(strength / 8));
}
