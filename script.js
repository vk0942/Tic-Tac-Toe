// it is a module
const message = document.querySelector('.message');
let curr_one = true , gameOver = true ,clear = true;
const Start_game = document.querySelector('#Start');
const reset = document.querySelector('#Reset');
message.textContent = "Click Start to  Play"
const Gameboard = (()=>{
 // Private variable to store the gameboard as an array
  let board = [];
  
  // Public method to initialize the gameboard with null values
  const createBoard = () => {
    board = Array(3).fill(null).map(() => Array(3).fill(null));
  };
  
  // Public method to get the current gameboard
  const getBoard = () => {
    return board;
  };

  // Public method to update the gameboard with a player's move
  const updateBoard = (row, col, value) => {
  board[row][col] = value;
  };

  // Other public methods for gameboard manipulation can be added here

  // Return public methods
  return { createBoard, getBoard, updateBoard};

})();




// Player factory
const Player = (name, sm) => {
    // Private variables for the player's name and symbol
    const player = name;
    const symbol = sm;
  
    // Public method to get the player's name
    const getName = () => {
      return player;
    };
  
    // Public method to get the player's symbol
    const getSymbol = () => {
      return symbol;
    };
  
    // Other public methods for player behavior can be added here
  
    // Return public methods
    return { getName, getSymbol };
};

const game = () => {
    // Initialize players
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
   
    // Initialize gameboard
    Gameboard.createBoard();
    const Board = document.querySelector('.Board');
    console.log(Board);
    const board = Gameboard.getBoard();
    console.log(board);
     
    // Other game flow control logic can be added here
   
   function Declare(z,s)
   {
    console.log("Declared");
    
    if(s==='X') message.textContent = player1.getName() +" Wins";
    if(s==='O') message.textContent  = player2.getName() + " Wins";
    if(z==='D') message.textContent = "It's a DRAW";
    if(z==='d')
    {
      if(board[0][0]===s&&board[2][2]===s)
      {
        for(let i=0;i<3;i++)
        {
          document.getElementById(String(i)+'|'+String(i)).style.background = "green";
        }
      }else{
        for(let i=0;i<3;i++)
        {
          document.getElementById(String(i)+'|'+String(2-i)).style.background = "green";
        }
      }
    }else if(z==='r')
    {
      for(let i=0;i<3;i++)
      {
       if(board[i].every(cell => cell===s))
       {
        for(let j=0;j<3;j++) document.getElementById(String(i)+'|'+String(j)).style.background = "green";
       }
      }
    }else if(z==='c')
    {
      for(let j=0;j<3;j++)
      {
        
        if(board[0][j]===s&&board[1][j]===s&&board[2][j]===s){
        for(let i=0;i<3;i++) document.getElementById(String(i)+'|'+String(j)).style.background = "green";}
      }
    }
    
   }  
  
      
   function curr_player()
   {
    if(curr_one) 
    {curr_one = false; message.textContent = player2.getName() + " Turn "; return player1;}
    curr_one=true;
    message.textContent = player1.getName()+" Turn ";
    return player2;
    
   }
   let X = [[0,0,0],[0,0,0]];
   let O = [[0,0,0],[0,0,0]];
   function check(r,c,s)
   {
     
     if(s==='X')
     {
      X[0][r]++;
      X[1][c]++;
     if((board[0][0]===s&&board[1][1]===s&&board[2][2]===s)||(board[0][2]===s&&board[1][1]===s&&board[2][0]===s))
     {
     
       Declare('d',s);
       return true;
     }
     if(X[0].includes(3)) 
     {
      Declare('r',s);
       return true;
     }
      if(X[1].includes(3))
     {
       Declare('c',s);
       return true;
     }
     }else if(s==='O'){
      O[0][r]++;
      O[1][c]++;
      if((board[0][0]===s&&board[1][1]===s&&board[2][2]===s)||(board[0][2]===s&&board[1][1]===s&&board[2][0]===s))
      {
        Declare('d',s);
        return true;
      }
      else if(O[0].includes(3)) 
      {
        Declare('r',s);
        return true;
      }
      else if(O[1].includes(3))
      {
        Declare('c',s);
        return true;
      }
     }
  
     if(!board.flat().includes(null)) {Declare('D','s'); return true};
     return false;
   }

 
    

    for(let r = 0; r<3;r++)
    {
        for(let c = 0;c<3;c++)
        {
            const block = document.createElement('div');
            block.classList.add('block');
            block.textContent = board[r][c];
            block.id=String(r)+'|'+String(c);
            Board.appendChild(block);
          
            
            block.addEventListener('click',()=>{
              clear = false;
              if(board[r][c] === null&&!gameOver) 
              {
                let s = curr_player().getSymbol();
                Gameboard.updateBoard(r,c,s);
                block.textContent = board[r][c];
                if(check(r,c,s)) gameOver = true;
              }
              

           })
        }
  
    }
  
    // Return any necessary methods or properties
    return {};
};

Start_game.addEventListener('click' ,()=>{
  
  if(gameOver&&clear) 
  {
    message.textContent = "Player1 turn";
    game();
  
  } 
   gameOver = false;
})
reset.addEventListener('click',()=>{
  gameOver = true;
  clear = true;
  const Board = document.querySelector('.Board');
  Board.innerHTML = "";
  message.textContent = "Click Start to play";
  curr_one=true;
})
