export const workspaceBoards = {
    createBoard: async(token: any, boardData: any, workspaceUuid: string) => {
        try {
            //convert boardData to plain object to avoid circular structure error
            const plainBoardData = JSON.parse(JSON.stringify(boardData));


            const response = await fetch('https://gadorjani.co.uk/api/boards', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Add this line
                },
                body: JSON.stringify({
                    ...plainBoardData,
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
            const response = await fetch(`https://gadorjani.co.uk/api/boards?workspaceUuid=${encodeURIComponent(workspaceUuid)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
               
            });
            if (!response.ok) {
                throw new Error('Failed to fetch boards');
            }

            const data = await response.json();
            console.log(data);
            return data;

        } catch (error) {
            console.error('Error fetching the board', error);
        }
    },
};
