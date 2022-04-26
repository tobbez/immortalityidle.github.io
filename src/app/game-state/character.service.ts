import { Injectable } from '@angular/core';
import { LogService } from '../log-panel/log.service';
import { MainLoopService } from '../main-loop.service';
import { ReincarnationService } from '../reincarnation/reincarnation.service';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterState = new Character();

  constructor(
    mainLoopService: MainLoopService,
    private logService: LogService,
    private reincarnationService: ReincarnationService
  ) {
    mainLoopService.tickSubject.subscribe(() => {
      this.characterState.age++;
      this.characterState.status.nourishment.value--;
      // check for death
      let deathMessage = "";
      if (this.characterState.age >= this.characterState.lifespan) {
        deathMessage = "You reach the end of your natural life and pass away from old age.";
      } else if (this.characterState.status.health.value <= 0) {
        deathMessage = "You succumb to your wounds and die.";
      } else if (this.characterState.status.nourishment.value <= 0) {
        deathMessage = "You starve to death.";
      }
      if (deathMessage != ""){
        this.logService.addLogMessage(deathMessage);
        this.logService.addLogMessage("You have failed to achieve immortality and your life has ended. Don't worry, I'm sure you'll achieve immortality in your next life.");
        this.logService.addLogMessage("Congratulations! The cycle of reincarnation has brought you back into the world. You have been born again.");
        this.logService.addLogMessage("It takes you a few years to grow up and remember your purpose: to become an immortal. You're all grown up now, so get to it!");
        this.reincarnationService.reincarnate();
      }
    });

    reincarnationService.reincarnateSubject.subscribe(()=> {
      this.characterState.reincarnate();
      if (Math.random() < .3){
        this.logService.addLogMessage("Your father puts some coins in your purse before sending you on your way.");
        this.characterState.money += 100;
      }
    })
  }
}
