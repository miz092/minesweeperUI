let viseString = "http://192.168.1.93:8080"
let homeString = "http://192.168.0.136:8080"
let officeString = "http://192.168.1.204:8080"
let onlineString = "https://justice-sweeper.onrender.com"
export async function startGame(orientation) {
  try {
    const response = await fetch(`${officeString}/play/start`, {

        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
        credentials: 'include',
        body: JSON.stringify({
  
          orientation: orientation.toUpperCase()
          }
        )
    });
  



    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error during fetch:', error);
    throw error; 
}
}

export async function updateGameState(gameState, interaction) {



  try {
    const response = await fetch(`${officeString}/play/interact`, {
        
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            credentials: 'include',
            body: JSON.stringify(    {
              gameState: gameState,
              interaction: interaction})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during fetch:', error);
    }
}
export{}