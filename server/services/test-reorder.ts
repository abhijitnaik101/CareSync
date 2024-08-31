import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a test inventory item with a 1-second expiration
async function createTestItem() {
    const now = new Date();
    const expireInOneSecond = new Date(now.getTime() + 1 * 1000); // 1 second from now

    const item = await prisma.inventory.create({
        data: {
            hospitalId: 1, // Use an appropriate hospitalId
            name: "Test Medicine",
            quantity: 10,
            price: 50,
            mfgdate: now,
            expDate: expireInOneSecond,
            category: "Test",
        },
    });

    console.log(`Created test item: ${item.name} with expiration date ${expireInOneSecond}`);
}

// Function to run reordering logic for testing
async function testReorderLogic() {
    console.log("Waiting for 1 second to let the item expire...");
    
    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Running reordering logic...");
    
    // Run the reordering function
    await reorderAfterExpiry();
}

// Reorder logic for expired items
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

// Run the test
async function runTest() {
    await createTestItem();
    await testReorderLogic();
}

runTest()
    .catch(e => {
        console.error('Error occurred during the test:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
