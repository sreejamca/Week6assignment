/*class Card with properties value,name and type
class Deck with property cardArray
class player with properties name,cardPortion[]
class Game 
functions player:getPortion,addToPortion,removeFromPortion
functions deck: shuffle
functions  Game: GameStart,WAR,announceWinner,prepareGame
description of the game:A deck of 52 cards with card name,card value and cardtype.
there are 4 card types,each card type has 13 card values.(4*13=52)
shuffle the deck and didvide the deck into 2 sets,each set holds 26 cards each.(player1 has 26 cards and player2 has 26 cards)/when the game starts,player1 pops a card from his cardset and player 2 pops a card from his set as well(you need a temperory array to hold the cards)
compare the values of each card then the card with more value player holds both card(temperory array can be pushed to the cardset at the beginning)
if the popped cards are equal,then declare a WAR
write a WAR function:both players will pop 4 cards consequetively,and then compare the value of the latest cards popped.The card with greater value player can have the temperory array and can push it to the card set.
if its again same value then call warFunction.
break the game when any of the players card set becomes empty,then declare the winner with most number of cards.
 */
// Class Card with a constructor with properties value,name,type.
class Card{
    constructor(value,name,type){
        this.value=value
        this.name=name
        this.type=type
    }
}
//Class Deck with constructor with cardArray property and createCardArray method.
class Deck{
    constructor(){
        this.cardArray=[]
        this.createCardArray();
    }
    createCardArray()//this method is to create an array to hold the card with cardValues,cardName and cardTypes.
    {
        let cardNames=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        let cardValues=[1,2,3,4,5,6,7,8,9,10,11,12,13];
        let cardTypes=['Club','Spades','Hearts','Diamond'];

        cardTypes.forEach(element=>{//for loop to iterate each elements and push them to empty cardArray.
            for(let i=0;i<cardNames.length;i++){
              this.cardArray.push(new Card(cardValues[i],cardNames[i],element))
            }

        })
        console.log(this.cardArray)//printing the cardArray.
    }
    shuffle(){//A function to shuffle the cardArray
       let shuffledArray = this.cardArray
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)

        this.cardArray = shuffledArray
       return this.cardArray;//return the shuffled cardArray.
    }
}
//class Player with a constructor with name,cardPortion array and warArray as properties.
class Player{
    constructor(name){
    this.name=name
    this.cardPortion=[]
    this.isWinner=false
    this.warArray=[]
    } 

    //Add a method to addtoPortion.This adds the holdCard at the beginning of the cardPortion.
    addToPortion(holdCards){
        holdCards.forEach(element=>this.cardPortion.unshift(element))
        return this.cardPortion;//return the cardPortion array.
    }
}
//class Game with a constructor with 3 objects.
class Game{
    constructor(){
        this.deck = new Deck()
        this.player1=new Player('Player A')
        this.player2=new Player('Player B')
    }
    // A function to Prepare for the game.
    prepareGame()
    {
        this.deck.shuffle();//shuffles the cards in the deck.
        console.log(this.deck.cardArray)//printing the shuffled card array.
        this.assignCardToPlayers();//invoking assignCardToPlayers to divide the shuffled cards into 2 equal sets of 26 cards each.
        console.log("Player1 has "+this.player1.cardPortion.length + " cards")//this prints the total number of cards of player1.
        console.log("Player2 has "+this.player2.cardPortion.length + " cards")//this prints the total number of cards of player2.
    }
    GameStart(){//The main game starts here.
        let isGameOver = false;//beginning of the game(game is not yet over).
        while(!isGameOver)//until the game is over ...do the following actions.
        {
            let holdCards=[]; //initialize an empty array to hold the popped cards of esch players.
            let  player1LastCard = this.player1.cardPortion.pop();
            console.log("Value of first card Player1 " +player1LastCard.value);
            let  player2LastCard = this.player2.cardPortion.pop();
            console.log("Value of first card  Player2 " +player2LastCard.value);
            holdCards.push(player1LastCard)
            holdCards.push(player2LastCard)
            if(player1LastCard.value>player2LastCard.value)//checking the condition by comparing the card values.
            {
             console.log("Player1 : "+this.player1.addToPortion(holdCards).length);//if true,add the cards in the holdcards to the player1 cardportion.
            }
            else if(player2LastCard.value>player1LastCard.value)//if the first condition fails,check the else if condition.
            {
                console.log("Player2 : "+this.player2.addToPortion(holdCards).length);//if true,add the cards in the holdcards to player2 cardportion.
            }
            else//values are equal
            {
                console.log("WAR");//print WAR
                this.warGame(holdCards);//invoke the warGame function with holdcard as a parameter.
            }
            isGameOver = (this.player1.cardPortion.length==0)||(this.player2.cardPortion.length==0);//if any of the palyers cardportion array doesnt have enogh cards to pop then the game is over.
            if(isGameOver)//if the condition is true
            {
                if(this.player1.cardPortion.length==0)//check if the player1 cardportion is empty
                {
                    this.player2.isWinner = true;//player 2 is the winner
                }
                else{
                    this.player1.isWinner = true;//otherwise player1 is the winner.
                }
            }
        }
        this.announceResult();//invoking announceResult function to declare the winner.
    }
        
    announceResult()//A function to announce the winner.
    {
        if(this.player1.isWinner)//checking if the player1 is the winner?
        {
            console.log("The winner is Player A")
        }
        else if(this.player2.isWinner){//otherwise checking the player2 is the winner?
            console.log("The winner is Player B")
        }
        else
        {
            console.log("Some cards were equal")//both players have the same number of cards.
        }
    }
    warGame(holdCards){//A function for warGame.
        //pop 4 cards for player A and add it to an array
        //this.player1.warArray.push(this.player1.cardPortion.slice(-4))
        this.resetWarArrays();//invoking resetWarArray.
        for(let i=0;i<4;i++)//for loop to itereate and pop the player1 cardportion 4 times.
        {
            let card = this.player1.cardPortion.pop()
            if(card!=undefined && card!=null)//if the condition is true,
            {
                this.player1.warArray.push(card)//add the cards popped to warArray of player1.
            }
        }
        console.log("Player1 War Array : "+this.player1.warArray)
        //pop 4 cards for player B and add it to another array
        //this.player2.warArray.push(this.player2.cardPortion.slice(-4)) 
        for(let i=0;i<4;i++)//for loop to iterate and pop the player2 cardportio 4 times.
        {
            let card = this.player2.cardPortion.pop()
            if(card!=undefined && card!=null)//if the condition is true,
            {
                this.player2.warArray.push(card)//add the popped cards to warArray of player2
            }
        }
        console.log("Player2 War Array : "+this.player2.warArray)  
        
        //Compare last popped items's values
        if(this.player2.warArray.length<4 || this.player1.warArray.length<4 )
        {
            if(this.player2.warArray.length<4)//if the palyer2 does not have enough cards to play,
            {
                this.doActionOnPlayer1WinsWar(holdCards);//declare palyer1 as the winner.
            }
            if(this.player1.warArray.length<4)//if the palyer1 does not have enough cards to play,
            {
                this.doActionOnPlayer2WinsWar(holdCards);//declare palyer1 as the winner.
            }
            return;//return from warGame.
        }
     //comparing the values of the last popped card values of both players.
        if((this.player1.warArray[this.player1.warArray.length-1].value)>(this.player2.warArray[this.player2.warArray.length-1].value)){
            this.doActionOnPlayer1WinsWar(holdCards);//declare the winner.
        }
        else if((this.player1.warArray[this.player1.warArray.length-1].value)<(this.player2.warArray[this.player2.warArray.length-1].value))
        {
            this.doActionOnPlayer2WinsWar(holdCards);
        }
        else
        {
            console.log("No one won the WAR. So WAR again")
            this.warGame();
        }
    }

    doActionOnPlayer2WinsWar(holdCards) {//A function to cpmpare the last popped cards of both players and declare the winner.
        if(holdCards !=undefined && holdCards!=null ){
        holdCards.forEach(element => this.player2.cardPortion.unshift(element));
        }
        this.player1.warArray.forEach(element => this.player2.warArray.push(element));
        this.player2.addToPortion(this.player2.warArray);
        console.log("Player2 won the WAR");
        console.log(this.player2.cardPortion.length);
        this.resetWarArrays();
    }

    doActionOnPlayer1WinsWar(holdCards) {
        if(holdCards !=undefined && holdCards!=null ){
        holdCards.forEach(element => this.player1.cardPortion.unshift(element));
        }
        this.player2.warArray.forEach(element => this.player1.warArray.push(element));
        this.player1.addToPortion(this.player1.warArray);
        console.log("Player1 won the WAR");
        console.log(this.player2.cardPortion.length);

        this.resetWarArrays();
    }

    resetWarArrays()//once the warGame is over, reset the warArray to empty to hold the warGame cards next time.
    {
        this.player1.warArray=[];
        this.player2.warArray=[];
    }

    assignCardToPlayers(){//after shuffling the deck,divid them into two equal sets of cards to both players.
     for(let i=0;i<this.deck.cardArray.length;i++){
        if(i=== 0|| i%2===0){
            this.player1.cardPortion.push(this.deck.cardArray[i]);
        }else{
            this.player2.cardPortion.push(this.deck.cardArray[i]);
        }
     }
    }
}

let game = new Game()
game.prepareGame();
game.GameStart();