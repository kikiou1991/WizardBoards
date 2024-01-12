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
                throw new Error('Fauled to create board')
            }

            const newBoard = await response.json();
            return { newBoard };
            
        } catch (error) {
            console.error('Error reating the board', error )
        }
    }
}