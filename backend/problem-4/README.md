Problem 4
---

# Summation Functions in Node.js

This project provides three different implementations (iterative, formula-based, and recursive) of a function that calculates the summation of all integers from 1 up to \( n \).

### Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Example](#example)
- [License](#license)

---

## Prerequisites
1. **Node.js** (v10 or above recommended)  
   - [Download Node.js](https://nodejs.org/en/download/)

2. **Git** (optional)  
   - If you wish to clone the repository directly from a remote source, you’ll need Git installed. [Download Git](https://git-scm.com/downloads)

---

## Project Structure

```
.
├── index.js
└── README.md
```

- **index.js**: Contains three implementations of `sum_to_n` functions:
  1. **sum_to_n_a** (iterative approach)
  2. **sum_to_n_b** (mathematical formula)
  3. **sum_to_n_c** (recursive approach)

- **README.md**: This documentation file.

---

## Usage

1. **Clone or Download** this repository.

2. Open a terminal (or command prompt) in the project folder.

3. Run the `index.js` file with Node.js. You can pass a command-line argument (like `5` or `10`) to calculate the summation for that number.

   ```bash
   node index.js 5
   ```

   Or just run without arguments (if you handle default values or prompts inside `index.js`).

---

## Example

If you run:

```bash
node index.js 5
```

And inside your `index.js`, if you have something like:

```js
const n = process.argv[2] ? parseInt(process.argv[2], 10) : 5;

console.log("sum_to_n_a:", sum_to_n_a(n));
console.log("sum_to_n_b:", sum_to_n_b(n));
console.log("sum_to_n_c:", sum_to_n_c(n));
```

The output should be:
```
sum_to_n_a: 15
sum_to_n_b: 15
sum_to_n_c: 15
```

Because \( 1 + 2 + 3 + 4 + 5 = 15 \).

**Happy Coding!**