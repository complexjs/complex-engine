"use strict";

import { cxWorld } from "./Complex";

export default abstract class cxManager {
  protected world: cxWorld | null = null;

  public abstract get tag(): string;

  public getWorld(): cxWorld | null {
    return this.world;
  }

  public setWorld(world: cxWorld) {
    this.world = world;
  }
}
