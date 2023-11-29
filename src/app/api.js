


export async function startGame() {

  try {
    const response = await fetch(`https://justice-sweeper.onrender.com/play/start`, {
      // const response = await fetch(`http://192.168.0.136:8080/play/start`, {
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
          //  const response = await fetch(`http://192.168.0.136:8080/play/interact`, {
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

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error during fetch:', error);
  }
}
export{}