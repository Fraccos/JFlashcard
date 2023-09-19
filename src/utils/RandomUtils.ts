export function generateRandomIntegers(N: number, lowerBound: number, upperBound: number): number[] {
    const numbers: Set<number> = new Set();
    const range: number = upperBound - lowerBound + 1;
  
    if (range < N) {
      console.error('Invalid input: Range is smaller than the required number of unique random integers.');
      return [];
    }
  
    while (numbers.size < N) {
      const randomNumber: number = Math.floor(Math.random() * range) + lowerBound;
      numbers.add(randomNumber);
    }
  
    return Array.from(numbers);
  }
  