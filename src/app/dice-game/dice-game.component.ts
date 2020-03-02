import { Component, OnInit, AfterViewInit,ElementRef, ViewChild, Inject, Injectable } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.css']
})
export class DiceGameComponent implements OnInit {
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceSrc : any;
  roundScore_0:number = 0;
  roundScore_1:number = 0;
  finalScore:number;
  public window = null;
  @ViewChild("#currentZero", {read: ElementRef}) currentZero: ElementRef;
  constructor(private hostElement: ElementRef,@Inject( DOCUMENT ) public document :HTMLDocument) {
    this.window = this.getWindow();
    console.log(this.window);
   }

  ngOnInit() {
  // document.querySelector('#current-0').textContent = this.dice;
  (document.querySelector('.dice') as HTMLElement).style.display = 'none';

  }
   getWindow (): any {
    return window;
  }
  test(){
    let test : any;
    test = document.querySelector('#current-0').textContent
    console.log(test);
  }
  rollDice(){
    if(this.gamePlaying){
      // getting a random number b/n 1-6
     let dice = Math.floor(Math.random() * 6) + 1;

    //  Displaying the respective dice to UI
      
    this.diceSrc = "/assets/images/"+"dice-"+dice+".png";
    (document.querySelector('.dice') as HTMLElement).style.display = 'block';

    //3. Update the round score IF the rolled number was NOT a 1
      if (dice !== 1) {
        //Add score
        this.roundScore += dice;
        if(this.activePlayer === 0 ){
          this.roundScore_0 = this.roundScore;
        } else {
          this.roundScore_1 = this.roundScore;
        }
        // let addScore =  "this.roundScore_"+this.activePlayer;
        // addScore = this.roundScore;
      } else {
        //Next player
        this.nextPlayer();
      }
    }
  }

  // giving turn to next player
  nextPlayer(){
    this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    this.roundScore = 0;
    this.roundScore_0 = 0;
    this.roundScore_1 = 0;
    
  
    /* things still to do
      1.setting up the avctive style to players: done
      2.initially hidding the dice: done
    */
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    (document.querySelector('.dice') as HTMLElement).style.display = 'none';
  }

  // setting up the hold function

  holdGame(){
    if(this.gamePlaying){
      // adding current score to global score
      this.scores[this.activePlayer] += this.roundScore;

      /* updating the appropriate UI
         it is done automatically by the two way bindings*/
        //  for adding limit to winning score
        // let winnigScore;
        //  if(this.finalScore){
        //   winnigScore=this.finalScore;
        //  } else {
        //    winnigScore = 100;
        //  }


      // checking if the player has won the game

      if(this.scores[this.activePlayer] >= 50){
        document.querySelector('#name-' + this.activePlayer).textContent = 'Winner!';
        // document.querySelector('.dice').style.display = 'none';
        (document.querySelector('.dice') as HTMLElement).style.display = 'none';
        document.querySelector('.player-' + this.activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + this.activePlayer + '-panel').classList.remove('active');
        this.gamePlaying = false;
      }else {
        this.nextPlayer();
      }
    }
  }

  initGame(){
    this.scores = [0, 0];
    this.activePlayer = 0;
    this.roundScore = 0;
    this.gamePlaying = true;
    this.roundScore_0 = 0;
    this.roundScore_1 = 0;

    // document.querySelector('.dice').style.display = 'none';
    (document.querySelector('.dice') as HTMLElement).style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
  }
}
