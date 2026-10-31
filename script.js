import { calculateTotals } from "./expense.js";

const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const transactionList = document.getElementById("transaction-list");

let transactions = [];

// Load saved transactions from browser local storage
try {
const saved = localStorage.getItem("transactions");
const parsed = saved ? JSON.parse(saved) : [];

```
if (Array.isArray(parsed)) {
    transactions = parsed.filter(transaction =>
        transaction &&
        typeof transaction.id === "string" &&
        typeof transaction.description === "string" &&
        Number.isFinite(transaction.amount) &&
        transaction.amount > 0 &&
        ["income", "expense"].includes(transaction.type) &&
        typeof transaction.category === "string"
    );
}
```

} catch {
transactions = [];
}

// Save transactions
function saveTransactions() {
try {
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
} catch {
alert("Unable to save transactions in this browser.");
}
}

// Format amounts in Indian Rupees
function formatCurrency(amount) {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR"
}).format(amount);
}

// Update income, expenses, and balance
function updateSummary() {
const totals = calculateTotals(transactions);

```
document.getElementById("income").textContent =
    formatCurrency(totals.income);

document.getElementById("expenses").textContent =
    formatCurrency(totals.expenses);

document.getElementById("balance").textContent =
    formatCurrency(totals.balance);
```

}

// Display transaction history
function renderTransactions() {
transactionList.replaceChildren();

```
if (transactions.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No transactions yet.";
    transactionList.appendChild(emptyMessage);
    return;
}

for (const transaction of transactions) {
    const item = document.createElement("li");
    item.className = "transaction";

    const info = document.createElement("div");
    info.className = "transaction-info";

    const title = document.createElement("strong");
    title.textContent = transaction.description;

    const details = document.createElement("p");
    details.textContent =
        `${transaction.category} • ${transaction.type}`;

    const amount = document.createElement("p");
    const sign =
        transaction.type === "income" ? "+" : "-";

    amount.textContent =
        sign + formatCurrency(transaction.amount);

    info.append(title, details, amount);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        transactions = transactions.filter(
            current => current.id !== transaction.id
        );

        saveTransactions();
        updateSummary();
        renderTransactions();
    });

    item.append(info, deleteButton);
    transactionList.appendChild(item);
}
```

}

// Add a new transaction
form.addEventListener("submit", event => {
event.preventDefault();

```
const description = descriptionInput.value.trim();
const amount = Number(amountInput.value);

if (
    !description ||
    !Number.isFinite(amount) ||
    amount <= 0
) {
    alert("Enter a description and a valid positive amount.");
    return;
}

const transaction = {
    id: crypto.randomUUID(),
    description,
    amount: Math.round(
        (amount + Number.EPSILON) * 100
    ) / 100,
    type: typeInput.value,
    category: categoryInput.value
};

transactions.push(transaction);

saveTransactions();
updateSummary();
renderTransactions();

form.reset();
descriptionInput.focus();
```

});

// Initialize the dashboard
updateSummary();
renderTransactions();
