export const workspaceBoards = {
    createBoard: async(token: any, boardData: any, workspaceUuid: string) => {
        try {
            const response = await fetch('https://gadorjani.co.uk/api/boards', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Add this line
                },
                body: JSON.stringify({
                    ...boardData,
                    workspaceUuid: workspaceUuid,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create board');
            }

            const newBoard = await response.json();
            return { newBoard };

        } catch (error) {
            console.error('Error creating the board', error);
        }
    },

    fetchBoard: async(token: any, workspaceUuid: string) => {
        try {
            const response = await fetch(`https://gadorjani.co.uk/api/boards`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ workspaceUuid}),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch boards');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching the board', error);
        }
    },
};
