import * as _ from "lodash";

export class World {
  public readonly tileRadius = 70;
  public readonly tileWidth = 2 * this.tileRadius;
  public readonly tileHeight = Math.sqrt(3) * this.tileRadius;

  private tilesMap: Map<string, Tile> = new Map();
  private unitsMap: Map<string, Unit[]> = new Map();

  constructor(
    private fieldRadius: number,
    public name: string,
    public coords: Coords[],
    private initialUnits: Unit[]
  ) {
    const fieldLeftOffset = /*fieldRadius * 3 / 4 * TILE_WIDTH*/ 0
    const fieldTopOffset = /*fieldRadius * 0.5 * TILE_HEIGHT*/ 0

    this.coords.forEach(coord => {
      if (coord.s >= this.fieldRadius * -1 && coord.s <= this.fieldRadius) {
        this.tilesMap.set(
          coord.key,
          new Tile
          (
            coord,
            fieldLeftOffset + (this.fieldRadius + coord.q) * 3 / 4 * this.tileWidth,
            fieldTopOffset + (this.fieldRadius + coord.r) * this.tileHeight + coord.q * 0.5 * this.tileHeight,
          )
        )
      }
    });


    this.initialUnits.forEach(unit => {
      let units = this.unitsMap.get(unit.coords.key) || [];
      this.unitsMap.set(unit.coords.key, [...units, unit]);
    });
  }

  get tiles(): Tile[] {
    return [...this.tilesMap.values()];
  }

  get units(): Unit[] {
    let unitArrays = [...this.unitsMap.values()];
    return _.flatten(unitArrays);
  }

  getUnitAt(coords: string | Coords): Unit[] | undefined {
    const key = (coords instanceof Coords) ? coords.key : coords;
    return this.unitsMap.get(key);
  }
}

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

export class Tile extends Coords {
  public state: string;
  public mouseOver = false;
  public selected = false;

  constructor(
    public coords: Coords,
    public left: number,
    public top: number
  ) {
    super(coords.q, coords.r, coords.s);
    this.state = 'normal';
  }
}
