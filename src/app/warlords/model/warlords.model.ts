export class Coords {
  constructor(public q: number,
              public r: number,
              public s: number
  ) {
  }

  get key(): string {
    return `q${this.q}r${this.r}s${this.s}`;
  }
}

export class Unit {
  constructor(
    public coords: Coords,
    public type: string,
    public size: number
  ) {
  }
}
