import promptSync from 'prompt-sync';
import mongoose from 'mongoose';
import "dotenv/config";
const prompt = promptSync();

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

// Function to create a customer
async function createCustomer() {
    const name = prompt("Enter name: ");
    const age = prompt("Enter age: ");
    const customer = new Customer({ name, age });
    await customer.save();
        console.log(`Customer ${name} added!`);
}

// Function to view all customers
async function getCustomers() {
    const customers = await Customer.find();
        console.log("\n List of customers:");
    customers.forEach(customer => {
        console.log(`- ${customer.name}, Age: ${customer.age}, ID: ${customer._id}`);
    });
}

// Function to update a customer
async function updateCustomer() {
    const customers = await Customer.find();
        console.log("\n Customers:");
    customers.forEach(customer => {
        console.log(`${customer._id}: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("Enter ID of the customer you want to update: ");
    const name = prompt("Enter new name: ");
    const age = prompt("Enter new age: ");
    await Customer.findByIdAndUpdate(id, { name, age });
        console.log("Customer updated!");
}

// Function to delete a customer
async function deleteCustomer() {
    const customers = await Customer.find();
        console.log("\n Customers:");
    customers.forEach(customer => {
        console.log(`${customer._id}: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt("Enter ID of the customer you want to delete: ");
    await Customer.findByIdAndDelete(id);
        console.log("Customer deleted.");
}

// Main connection and menu loop
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
        console.log("Welcome to the CRM");

    let running = true;

    while (running) {
        console.log("\nPlease choose an option:");
        console.log("1. Create a customer");
        console.log("2. View all customers");
        console.log("3. Update a customer");
        console.log("4. Delete a customer");
        console.log("5. Quit");

        const option = prompt("Enter a number: ");

        if (option === "1") {
            await createCustomer();
        } else if (option === "2") {
            await getCustomers();
        } else if (option === "3") {
            await updateCustomer();
        } else if (option === "4") {
            await deleteCustomer();
        } else if (option === "5") {
            console.log("Goodbye!");
            running = false;
        } else {
            console.log("Invalid choice. Please enter 1, 2, 3, 4, or 5.");
        }
    }

    await mongoose.disconnect();
        console.log("exiting...");
    process.exit();
};

connect();