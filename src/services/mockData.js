export const getUserData = async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUsers = {
        '123': {
            id: '123',
            name: 'Alex Doe',
            medicalConditions: ['Epilepsy - Tonic Clonic'],
            emergencyContacts: [
                { name: 'Jane Doe', relation: 'Mother', phone: '555-0101' },
                { name: 'John Doe', relation: 'Father', phone: '555-0102' }
            ],
            notes: ' seizure usually lasts 2-3 mins. Administer rescue meds if > 5 mins.',
            address: '123 Main St, Springfield, IL'
        }
    };

    return mockUsers[userId] || null;
};
