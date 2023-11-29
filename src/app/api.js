


export async function startGame() {

  try {
    const response = await fetch(`https://justice-sweeper.onrender.com/play/start`, {
      method: 'GET',
      headers: {    'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,POST' }

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


  let gameUpdateRequest = {};
  try {
    const response = await fetch(`https://justice-sweeper.onrender.com/play/interact`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,POST'
      },
      body: 
      JSON.stringify(
        gameUpdateRequest = {
        gameState: gameState,
        interaction: interaction}
      ),
    
  
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