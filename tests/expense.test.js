import test from "node:test";
import assert from "node:assert/strict";

import { calculateTotals } from "../expense.js";

test("calculates income, expenses, and balance", () => {
const transactions = [
{ amount: 5000, type: "income" },
{ amount: 500, type: "expense" },
{ amount: 300, type: "expense" }
];

```
assert.deepEqual(calculateTotals(transactions), {
    income: 5000,
    expenses: 800,
    balance: 4200
});
```

});

test("returns zero totals for an empty transaction list", () => {
assert.deepEqual(calculateTotals([]), {
income: 0,
expenses: 0,
balance: 0
});
});

test("calculates decimal amounts correctly", () => {
const transactions = [
{ amount: 100.50, type: "income" },
{ amount: 25.25, type: "expense" }
];

```
assert.deepEqual(calculateTotals(transactions), {
    income: 100.50,
    expenses: 25.25,
    balance: 75.25
});
```

});

test("rejects negative transaction amounts", () => {
assert.throws(
() => calculateTotals([
{ amount: -100, type: "expense" }
]),
/Invalid transaction amount/
);
});

test("rejects invalid transaction types", () => {
assert.throws(
() => calculateTotals([
{ amount: 100, type: "invalid" }
]),
/Invalid transaction type/
);
});
