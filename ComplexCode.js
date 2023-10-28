/* 
   Filename: ComplexCode.js
   Description: This code implements a complex algorithm for finding the prime numbers within a given range using the Sieve of Eratosthenes.
*/

function getPrimesInRange(start, end) {
  // Step 1: Create an array with boolean values indicating prime or not
  const primes = new Array(end + 1).fill(true);
  
  // Step 2: Mark the multiples as non-prime
  for (let i = 2; i <= Math.sqrt(end); i++) {
    if (primes[i]) {
      for (let j = i ** 2; j <= end; j += i) {
        primes[j] = false;
      }
    }
  }
  
  // Step 3: Build the list of prime numbers
  const primeNumbers = [];
  for (let i = start; i <= end; i++) {
    if (primes[i]) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}

// Example usage
const startRange = 1;
const endRange = 100;
const primeNumbersInRange = getPrimesInRange(startRange, endRange);
console.log(primeNumbersInRange);