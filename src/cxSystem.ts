"use strict";

import cxEntity from "./cxEntity";
import cxWorld from "./cxWorld";

/**
 * Abstract System. A system is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
export default abstract class cxSystem {
  protected world: cxWorld | null = null;

  public abstract get tag(): string;

  /**
   * get notified when system is added to world
   */
  public addedToWorld(): void {}

  /**
   * get notified when entity is added to world
   */
  public added(entity: cxEntity): void {}

  /**
   * get notified when entity is removed from world
   */
  public removed(entity: cxEntity): void {}

  public setWorld(value: cxWorld): void {
    this.world = value;
  }
}
