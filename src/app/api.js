

export async function startGame() {
  console.log("startGame called");
  try {
    const response = await fetch(`https://justice-sweeper.onrender.com/play/start`, {
      credentials: 'include', // Don't forget to specify this if you need cookies
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
  console.log("updateGameState called");

  let gameUpdateRequest = {};
  try {
    const response = await fetch(`https://justice-sweeper.onrender.com/play/interact`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: 
      JSON.stringify(
        gameUpdateRequest = {
        gameState: gameState,
        interaction: interaction}
      ),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
//// itt kapunk egy gamereply objektumot, amit vissza kell adni a játéknak
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error during fetch:', error);
  }
}
export{}