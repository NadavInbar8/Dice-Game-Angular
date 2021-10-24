import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.scss'],
})
export class DiceGameComponent implements OnInit {
  // game variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0class = 'player player--0 player';
  player1class = 'player player--1 player';
  current0score = 0;
  current1score = 0;

  diceUrl = 'assets/dice-pics/dice-1.png';
  diceClass = 'dice';

  // modal variables
  modalClass = 'modal hidden';
  overlayClass = 'overlay hidden';

  constructor() {}

  ngOnInit(): void {
    this.scores = [0, 0];
    this.currentScore = 0;
    this.activePlayer = 0;
    this.playing = true;

    this.player0class = 'player player--0 player--active';
    this.player1class = 'player player--1 player';
    this.current0score = 0;
    this.current1score = 0;

    this.diceUrl = 'assets/dice-pics/dice-1.png';
    this.diceClass = 'dice';
  }

  switchPlayer() {
    this.currentScore = 0;
    if (this.activePlayer === 0) {
      //reseting the current score
      this.current0score = 0;
      //switching player
      this.activePlayer = 1;
      this.player0class = 'player player--0 player';
      this.player1class = 'player player--1 player--active';
    } else {
      //reseting the current score
      this.current1score = 0;
      //switching player
      this.activePlayer = 0;
      this.player0class = 'player player--0 player--active';
      this.player1class = 'player player--1 player';
    }
  }

  roll() {
    if (this.playing) {
      const diceRoll = Math.trunc(Math.random() * 6) + 1;
      this.diceClass.replace(' hidden', '');
      this.diceUrl = `assets/dice-pics/dice-${diceRoll}.png`;
      if (diceRoll !== 1) {
        this.currentScore += diceRoll;
        this.activePlayer === 0
          ? (this.current0score = this.currentScore)
          : (this.current1score = this.currentScore);
      } else {
        //switch player
        this.switchPlayer();
      }
    }
  }

  hold() {
    if (this.playing) {
      // adds the current score to the active player
      this.scores[this.activePlayer] += this.currentScore;

      // check if player score is >= 50 win game
      if (this.scores[this.activePlayer] >= 50) {
        if (this.activePlayer === 0) {
          this.player0class = 'player player--0 player--winner';
          this.player1class = 'player player--1 player';
          this.diceClass = 'dice hidden';
        } else {
          this.player1class = 'player player--1 player--winner';
          this.player0class = 'player player--0 player';
          this.diceClass = 'dice hidden';
        }
        this.playing = false;
        this.diceClass = 'dice hidden';
      }
      // switch the player after hold
      else {
        this.switchPlayer();
      }
    }
  }

  newGame() {
    this.ngOnInit();
  }

  //modal for instructions
  instructions() {
    this.modalClass = 'modal';
    this.overlayClass = 'overlay';
  }

  closeModal() {
    this.modalClass = 'modal hidden';
    this.overlayClass = 'overlay hidden';
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.closeModal();
  }
}
