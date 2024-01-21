export const listCards = {
    createCards: async (token: any, cardData: any, listUuid: string) => {
        try {
            const { title } = cardData;
            const response = await fetch('https://gadorjani.co.uk/api/cards', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listUuid,
                    title,
                
                }),
            });
            //check if the response is okay
            if(!response.ok) {
                throw new Error('Failed to create card');
            }

            const newCard = await response.json();
            return { newCard };
        } catch (error: any) {
            console.error('Error creating card: ', error.message);
        }
    },

    getCards: async(token: any, listUuid: string) => {
        try {
            const response = await fetch(`https://gadorjani.co.uk/api/cards?listUuid=${encodeURIComponent(listUuid)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }

            const data = await response.json();
            console.log(data);
            return data;
            
        } catch (error: any) {
            console.error('Error fetching cards: ', error.message);
        }
    }
}