import {Component} from '@angular/core';
import {ReplaySubject} from "rxjs";


// https://www.redblobgames.com/grids/hexagons/#coordinates

class Coords {
  constructor(public q: number,
              public r: number,
              public s: number
  ) {
  }
}

const UP_LEFT = new Coords(-1, 0, 1);
const UP = new Coords(0, -1, +1);
const UP_RIGHT = new Coords(1, -1, 0);
const DOWN_RIGHT = new Coords(1, 0, -1);
const DOWN = new Coords(0, 1, -1);
const DOWN_LEFT = new Coords(-1, 1, 0);

class Tile extends Coords {
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  readonly tileRadius = 70;
  readonly tileWidth = 2 * this.tileRadius;
  readonly tileHeight = Math.sqrt(3) * this.tileRadius;
  readonly fieldRadius = 3;

  tiles: Map<Coords, Tile> = new Map();
  tiles$ = new ReplaySubject<Tile[]>(1);
  selectedTile: Tile | undefined;

  constructor() {
    const fieldLeftOffset = /*fieldRadius * 3 / 4 * TILE_WIDTH*/ 0
    const fieldTopOffset = /*fieldRadius * 0.5 * TILE_HEIGHT*/ 0

    for (let q = this.fieldRadius * -1; q <= this.fieldRadius; q++) {
      for (let r = this.fieldRadius * -1; r <= this.fieldRadius; r++) {

        const coords = new Coords(
          q, r, 0 - q - r
        );

        if (coords.s >= this.fieldRadius * -1 && coords.s <= this.fieldRadius) {
          this.tiles.set(
            coords,
            new Tile
            (
              coords,
              fieldLeftOffset + (this.fieldRadius + q) * 3 / 4 * this.tileWidth,
              fieldTopOffset + (this.fieldRadius + r) * this.tileHeight + q * 0.5 * this.tileHeight,
            )
          )
        }
      }

      this.tiles$.next([...this.tiles.values()]);
    }
  }

  onMouseEnter(tile: Tile) {
    tile.mouseOver = true;
  }

  onMouseLeave(tile: Tile) {
    tile.mouseOver = false;
  }

  onMouseClick(tile: Tile) {
    tile.selected = !tile.selected;

    if (tile.selected) {
      if (this.selectedTile) {
        this.selectedTile.selected = false;
      }
      this.selectedTile = tile;
    } else {
      this.selectedTile = undefined;
    }
  }
}
