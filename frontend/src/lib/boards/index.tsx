export const workspaceBoards = {
    createBoard: async( token: any, boardData: any) => {
        try {
            const response = await fetch('https://gadorjani.co.uk/api/boards', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    body: boardData
                }),
            })
            if(!response.ok) {
                throw new Error('Failed to create board')
            }

            const newBoard = await response.json();
            return { newBoard };
            
        } catch (error) {
            console.error('Error reating the board', error )
        }
    },

    fetchBoard: async( token: any, boardData: any) => {
        try {
            const response = await fetch('https://gadorjani.co.uk/api/boards', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    body: boardData
                }),
            })
            if(!response.ok) {
                throw new Error('Failed to fetch boards')
            }

            const newBoard = await response.json();
            return { newBoard };
            
        } catch (error) {
            console.error('Error fetching the board', error )
        }
    },

    
}

