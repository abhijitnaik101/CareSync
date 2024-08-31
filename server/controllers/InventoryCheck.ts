import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to reorder items after expiry
async function reorderAfterExpiry() {
    const today = new Date();

    // Find expired items
    const expiredItems = await prisma.inventory.findMany({
        where: {
            expDate: {
                lt: today, // Expiry date is less than today
            },
            quantity: {
                gt: 0, // Ensure quantity is greater than 0 before reordering
            },
        },
    });

    for (const item of expiredItems) {
        console.log(`Reordering expired item: ${item.name}`);

        // Reorder logic
        // Here, we simply update the quantity and reset expiry for demonstration purposes
        await prisma.inventory.update({
            where: { id: item.id },
            data: {
                quantity: 100, // Default reorder quantity
                // Optionally, reset the expDate or any other logic needed
            },
        });

        console.log(`Item ${item.name} reordered successfully.`);
    }
}

// Function to reorder items with low stock
async function reorderLowStock() {
    const lowStockThreshold = 5; // Define your threshold for low stock

    // Find items with low stock
    const lowStockItems = await prisma.inventory.findMany({
        where: {
            quantity: {
                lt: lowStockThreshold,
            },
        },
    });

    for (const item of lowStockItems) {
        console.log(`Reordering low stock item: ${item.name}`);

        // Reorder logic
        // For demonstration, we're assuming we reorder to a default quantity
        await prisma.inventory.update({
            where: { id: item.id },
            data: {
                quantity: 100, // Default reorder quantity
            },
        });

        console.log(`Item ${item.name} reordered successfully.`);
    }
}

// Main function to perform the reordering tasks
async function performReorders() {
    await reorderAfterExpiry();
    await reorderLowStock();
}

// Run the reordering tasks
performReorders()
    .catch(e => {
        console.error('Error occurred during reordering:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
