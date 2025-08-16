function generateUnique5Numbers() {
  let numbers = new Set();

  while (numbers.size < 5) {
    let num = Math.floor(Math.random() * 16); // 0 to 15
    numbers.add(num);
  }

  return Array.from(numbers);
}

export default generateUnique5Numbers;