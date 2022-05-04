import { Injectable, Injector } from '@angular/core';
import { ActivityService } from '../activity-panel/activity.service';
import { LogService } from '../log-panel/log.service';
import { CharacterService } from './character.service';
import { HomeService } from './home.service';
import { InventoryService, Item } from './inventory.service';

export type ItemType =
  | 'copperOre'
  | 'bronzeOre'
  | 'ironOre'
  | 'copperBar'
  | 'bronzeBar'
  | 'ironBar'
  | 'rice'
  | 'herb'
  | 'log'
  | 'junk'
  | 'perpetualFarmingManual'
  | 'weapon'
  | 'restartActivityManual'
  | 'autoSellManual'
  | 'autoUseManual'
  | 'autoBuyLandManual'
  | 'autoBuyHomeManual'
  | 'autoFieldManual'
  | 'cabbage'
  | 'beans'
  | 'melon'
  | 'peach'
  | 'broccoli'
  | 'meat'
  | 'potion';

@Injectable({
  providedIn: 'root'
})
export class ItemRepoService {
  homeService?: HomeService;
  activityService?: ActivityService;
  inventoryService?: InventoryService;

  rice: Item = {
    id: 'rice',
    name: 'rice',
    type: 'food',
    value: 1,
    description: 'A basic staple of life. One pouch will sustain you for a day.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      this.characterService.characterState.checkOverage();
    },
  };

  cabbage: Item = {
    id: 'cabbage',
    name: 'cabbage',
    type: 'food',
    value: 5,
    description: 'A simple, healthy vegetable.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.01){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  beans: Item = {
    id: 'beans',
    name: 'beans',
    type: 'food',
    value: 10,
    description: 'A handful of healthy vegetables.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.02){
        this.characterService.characterState.status.health.max++;
      }
      this.characterService.characterState.checkOverage();
    },
  };

  broccoli: Item = {
    id: 'broccoli',
    name: 'broccoli',
    type: 'food',
    value: 20,
    description: 'A very healthy vegetable.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.05){
        this.characterService.characterState.status.health.max++;
        if (this.characterService.characterState.lifespan < (365 * 40)){
          this.characterService.characterState.lifespan += 1;
        }
      }
      this.characterService.characterState.checkOverage();
    },
  };

  melon: Item = {
    id: 'melon',
    name: 'melon',
    type: 'food',
    value: 30,
    description: 'A delicious fruit.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and helps you be healthy.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.1){
        this.characterService.characterState.status.health.max++;
        if (this.characterService.characterState.lifespan < (365 * 54)){
          this.characterService.characterState.lifespan += 1;
        }
      }
      this.characterService.characterState.checkOverage();
    },
  };

  peach: Item = {
    id: 'peach',
    name: 'peach',
    type: 'food',
    value: 50,
    description: 'A highly prized and delicious fruit.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly and can even lead to a long life.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      if (Math.random() < 0.2){
        this.characterService.characterState.status.health.max++;
        if (this.characterService.characterState.lifespan < (365 * 72)){
          this.characterService.characterState.lifespan += 1;
        }
      }
      this.characterService.characterState.checkOverage();
    },
  };

  meat: Item = {
    id: 'meat',
    name: 'meat',
    type: 'food',
    value: 50,
    description: 'Some delicious meat.',
    useLabel: 'Eat',
    useDescription: 'Fills your belly. Can also improve your health and stamina.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.nourishment.value++;
      this.characterService.characterState.status.health.max++;
      this.characterService.characterState.status.stamina.max++;
      this.characterService.characterState.checkOverage();
    },
  };

  herb: Item = {
    id: 'herb',
    name: 'herb',
    type: 'ingredient',
    value: 2,
    description: 'Useful herbs. Can be used in creating pills or potions.',
    useLabel: 'Use',
    useDescription: 'Restores a bit of health.',
    useConsumes: true,
    use: () => {
      this.characterService.characterState.status.health.value += 5;
      this.characterService.characterState.checkOverage();
    },
  };

  log: Item = {
    id: 'log',
    name: 'log',
    type: 'wood',
    value: 1,
    description: 'A good-quality log.',
  };

  copperOre: Item = {
    id: 'copperOre',
    name: 'copper ore',
    type: 'ore',
    value: 1,
    description: 'A chunk of copper ore.',
  };

  bronzeOre: Item = {
    id: 'bronzeOre',
    name: 'mixed ore',
    type: 'ore',
    value: 2,
    description: 'A chunk of ore containing copper, tin, lead, and zinc.'
  };

  ironOre: Item = {
    id: 'ironOre',
    name: 'iron ore',
    type: 'ore',
    value: 3,
    description: 'A chunk of iron ore.',
  };

  copperBar: Item = {
    id: 'copperBar',
    name: 'copper bar',
    type: 'metal',
    value: 1,
    description: 'A bar of copper.',
  };

  bronzeBar: Item = {
    id: 'bronzeBar',
    name: 'bronze bar',
    type: 'metal',
    value: 2,
    description: 'A bar of bronze.',
  };

  ironBar: Item = {
    id: 'ironBar',
    name: 'iron bar',
    type: 'metal',
    value: 3,
    description: 'A bar of iron.',
  };

  junk: Item = {
    id: 'junk',
    name: 'junk',
    type: 'metal',
    value: 1,
    description: 'Some metal junk.',
  };

  //TODO: tune prices on all manuals, currently silly cheap for testing

  perpetualFarmingManual: Item = {
    id: 'perpetualFarmingManual',
    name: "Manual of Perpetual Farming",
    type: "manual",
    description: "This manual teaches you to automatically replant fields when they are harvested.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock automatic farm replanting.",
    useConsumes: true,
    use: () => {
      // check if homeService is injected yet, if not, inject it (circular dependency issues)
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      this.homeService.autoReplant = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      // check if homeService is injected yet, if not, inject it (circular dependency issues)
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      return this.homeService?.autoReplant;
    }
  };

  restartActivityManual: Item = {
    id: 'restartActivityManual',
    name: "Manual of Remembered Plans",
    type: "manual",
    description: "This manual teaches you to automatically resume activities from your previous life. Only activities that you qualify for when you reach adulthood are available to resume.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock preserving activity plans across reincarnations.",
    useConsumes: true,
    use: () => {
      // check if actvityService is injected yet, if not, inject it (circular dependency issues)
      if (!this.activityService){
        this.activityService = this.injector.get(ActivityService);
      }
      this.activityService.autoRestart = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      // check if actvityService is injected yet, if not, inject it (circular dependency issues)
      if (!this.activityService){
        this.activityService = this.injector.get(ActivityService);
      }
      return this.activityService?.autoRestart;
    }
  };

  autoSellManual: Item = {
    id: 'autoSellManual',
    name: "Manual of Mercantile Fluency",
    type: "manual",
    description: "This manual teaches you to automatically sell items.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock Autosell button in the inventory panel.",
    useConsumes: true,
    use: () => {
      // check if inventoryService is injected yet, if not, inject it (circular dependency issues)
      if (!this.inventoryService){
        this.inventoryService = this.injector.get(InventoryService);
      }
      this.inventoryService.autoSellUnlocked = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      // check if inventoryService is injected yet, if not, inject it (circular dependency issues)
      if (!this.inventoryService){
        this.inventoryService = this.injector.get(InventoryService);
      }
      return this.inventoryService.autoSellUnlocked;
    }
  };

  autoUseManual: Item = {
    id: 'autoUseManual',
    name: "Manual of Facilitated Usage",
    type: "manual",
    description: "This manual teaches you to automatically use items.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock Autouse button in the inventory panel.",
    useConsumes: true,
    use: () => {
      // check if inventoryService is injected yet, if not, inject it (circular dependency issues)
      if (!this.inventoryService){
        this.inventoryService = this.injector.get(InventoryService);
      }
      this.inventoryService.autoUseUnlocked = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      // check if inventoryService is injected yet, if not, inject it (circular dependency issues)
      if (!this.inventoryService){
        this.inventoryService = this.injector.get(InventoryService);
      }
      return this.inventoryService.autoUseUnlocked;
    }
  };

  autoBuyLandManual: Item = {
    id: 'autoBuyLandManual',
    name: "Manual of Land Acquisition",
    type: "manual",
    description: "This manual teaches you to automatically purchase land.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock automatic land purchasing.",
    useConsumes: true,
    use: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      this.homeService.autoBuyLandUnlocked = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      return this.homeService.autoBuyLandUnlocked;
    }
  };

  autoBuyHomeManual: Item = {
    id: 'autoBuyHomeManual',
    name: "Manual of Home Improvement",
    type: "manual",
    description: "This manual teaches you to automatically upgrade your home.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock automatic home upgrades.",
    useConsumes: true,
    use: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      this.homeService.autoBuyHomeUnlocked = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      return this.homeService.autoBuyHomeUnlocked;
    }
  };

  autoFieldManual: Item = {
    id: 'autoFieldManual',
    name: "Manual of Field Conversion",
    type: "manual",
    description: "This manual teaches you to automatically plow open land into fields.",
    value: 1,
    useLabel: "Read",
    useDescription: "Permanently unlock automatic field plowing.",
    useConsumes: true,
    use: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      this.homeService.autoFieldUnlocked = true;
      this.logService.addLogMessage("The teachings of the manual sink deep into your soul. You'll be able to apply this knowledge in all future reincarnations.", "STANDARD", 'EVENT');
    },
    owned: () => {
      if (!this.homeService){
        this.homeService = this.injector.get(HomeService);
      }
      return this.homeService.autoFieldUnlocked;
    }
  };

  constructor(private characterService: CharacterService,
    private injector: Injector,
    private logService: LogService
    ) { }

    getItemById(id: ItemType): Item {
      switch (id) {
        case 'beans':
          return this.beans;
        case 'broccoli':
          return this.broccoli;
        case 'cabbage':
          return this.cabbage;
        case 'herb':
          return this.herb;
        case 'junk':
          return this.junk;
        case 'log':
          return this.log;
        case 'meat':
          return this.meat;
        case 'melon':
          return this.melon;
        case 'copperOre':
          return this.copperOre;
        case 'bronzeOre':
          return this.bronzeOre;
        case 'ironOre':
          return this.ironOre;
        case 'copperBar':
          return this.copperBar;
        case 'bronzeBar':
          return this.bronzeBar;
        case 'ironBar':
          return this.ironBar;
        case 'peach':
          return this.peach;
        case 'perpetualFarmingManual':
          return this.perpetualFarmingManual;
        case 'restartActivityManual':
          return this.restartActivityManual;
        case 'autoSellManual':
          return this.autoSellManual;
        case 'rice':
          return this.rice;
        case 'potion':
          // problem with this id thing. for now just roll a new potion
          if (!this.inventoryService){
            this.inventoryService = this.injector.get(InventoryService);
          }
          return this.inventoryService?.generatePotion(1);
        case 'weapon':
          // problem with this id thing. for now just roll a new weapon
          if (!this.inventoryService){
            this.inventoryService = this.injector.get(InventoryService);
          }
          return this.inventoryService?.generateWeapon(1, "metal");
        default:
          throw new Error(`Failed to get item for ID: ${id}`);
      }
    }
}

