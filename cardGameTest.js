const expect = chai.expect
const assert = chai.assert
describe('CardGame Functionality Test: Deck class', () => {
    class Deck{
        constructor(){
            this.cardArray=[]
            this.createCardArray();
        }
        createCardArray()
        {
            let cardNames=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
            let cardValues=[1,2,3,4,5,6,7,8,9,10,11,12,13];
            let cardTypes=['Club','Spades','Hearts','Diamond'];
    
            cardTypes.forEach(element=>{
                for(let i=0;i<cardNames.length;i++){
                  this.cardArray.push(new Card(cardValues[i],cardNames[i],element))
                }
    
            })
        } 
        shuffle(){
                 let shuffledArray = this.cardArray
                             .map(value => ({ value, sort: Math.random() }))
                             .sort((a, b) => a.sort - b.sort)
                             .map(({ value }) => value)
     
             this.cardArray = shuffledArray
            return this.cardArray;
         }
         
     }
       
     it('#should create an array of cards',()=>{
        let deck=new Deck()
        expect(deck.cardArray.length).to.equal(52)
     }) 

     it('#should check the number of cards shuffled',()=>{
        let deck=new Deck()
        deck.shuffle()
        expect(deck.cardArray.length).to.equal(52)
     })
})
describe('card creation',()=>{
class Card{
    constructor(value,name,type){
        this.value=value
        this.name=name
        this.type=type
    }
}
it('#should create a card with provided values',()=>{
    let card=new Card(13,'k','spade')
   expect(card.value).to.equal(13)
   expect(card.name).to.equal('k')
   expect(card.type).to.equal('spade')
})
})
describe('class Player',()=>{
class Player{
    constructor(name){
    this.name=name
    this.cardPortion=[]
    this.isWinner=false
    this.warArray=[]
    } 
    addToPortion(holdCards){
        holdCards.forEach(element=>this.cardPortion.unshift(element))
        return this.cardPortion;
    }
}
it('#should check the player formation',()=>{
    let player=new Player('Sachin')
    expect(player.name).to.equal('Sachin')
})
it('#should check the cards added to the player portion',()=>{
let player=new Player()
expect(player.cardPortion.length).to.equal(0)
player.addToPortion([new Card(13,'k','spade'),new Card(12,'Q','club')]);
expect(player.cardPortion.length).to.equal(2)
})
})
describe('class Game',()=>{
   
class Game{
    constructor(){
        this.deck = new Deck()
        this.player1=new Player('Player A')
        this.player2=new Player('Player B')
    }

    prepareGame()
    {
        this.deck.shuffle();
        console.log(this.deck.cardArray)
        this.assignCardToPlayers();
        console.log("Player1 has "+this.player1.cardPortion.length + " cards")
        console.log("Player2 has "+this.player2.cardPortion.length + " cards")
    }
    gameStart(){
        let isGameOver = false;
        while(!isGameOver)
        {
            let holdCards=[]; 
            let  player1LastCard = this.player1.cardPortion.pop();
            console.log("Value of first card Player1 " +player1LastCard.value);
            let  player2LastCard = this.player2.cardPortion.pop();
            console.log("Value of first card  Player2 " +player2LastCard.value);
            holdCards.push(player1LastCard)
            holdCards.push(player2LastCard)
            if(player1LastCard.value>player2LastCard.value)
            {
             console.log("Player1 : "+this.player1.addToPortion(holdCards).length);
            }
            else if(player2LastCard.value>player1LastCard.value)
            {
                console.log("Player2 : "+this.player2.addToPortion(holdCards).length);
            }
            else
            {
                console.log("WAR");
                this.warGame(holdCards);
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
    it('#should check game creation to see if players are created and the deck is available',()=>{
        let game=new Game()
       expect(game.player1.name).to.equal('Player A') 
       expect(game.player2.name).to.equal('Player B')
       expect(game.deck.cardArray.length).to.equal(52)

    })
    it('#should test prepareGame function',()=>{
        let game=new Game()
        game.prepareGame()
        expect(game.player1.cardPortion.length).to.equal(26)
        expect(game.player2.cardPortion.length).to.equal(26)
        expect(game.deck.cardArray.length).to.equal(52)
    })
    it('#should test if the game is over, there should be one winner and only one player won the game',()=>{
        let game=new Game()
        game.prepareGame()
        game.gameStart()
        expect((game.player1.cardPortion.length==0)||(game.player2.cardPortion.length==0)).to.equal(true)
        expect(game.player1.isWinner||game.player2.isWinner).to.equal(true);
        expect(game.player1.isWinner&&game.player2.isWinner).to.equal(false);

    })
    it('#should test if player1 cardportion is increased and the warArray of both players are empty',()=>{
      let game=new Game()
      game.prepareGame()
      game.gameStart()
      let player1CardLength=(game.player1.cardPortion.length);
      game.doActionOnPlayer1WinsWar([new Card(13,'k','spade'),new Card(12,'Q','club')])
      expect(game.player1.cardPortion.length>player1CardLength).to.equal(true);
      expect(game.player1.warArray.length).to.equal(0);
      expect(game.player2.warArray.length).to.equal(0);
    })
    it('#should test if player2 cardportion is increased and the warArray of both players are empty',()=>{
        let game=new Game()
        game.prepareGame()
        game.gameStart()
        let player2CardLength=(game.player2.cardPortion.length);
        game.doActionOnPlayer2WinsWar([new Card(3,'3','heart'), new Card(6,'6','diamond')])
        expect(game.player2.cardPortion.length>player2CardLength).to.equal(true);
        expect(game.player2.warArray.length).to.equal(0);
        expect(game.player2.warArray.length).to.equal(0);
    })
    })



    



