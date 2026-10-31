export function calculateTotals(transactions) {
let income = 0;
let expenses = 0;

```
for (const transaction of transactions) {
    const amount = Number(transaction.amount);

    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error("Invalid transaction amount");
    }

    if (transaction.type === "income") {
        income += amount;
    } else if (transaction.type === "expense") {
        expenses += amount;
    } else {
        throw new Error("Invalid transaction type");
    }
}

income = Math.round((income + Number.EPSILON) * 100) / 100;
expenses = Math.round((expenses + Number.EPSILON) * 100) / 100;

const balance = Math.round(
    (income - expenses + Number.EPSILON) * 100
) / 100;

return {
    income,
    expenses,
    balance
};
```

}
