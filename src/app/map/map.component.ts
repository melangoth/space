import {Component} from '@angular/core';
import {ReplaySubject} from "rxjs";

const TILE_RADIUS = 50;
const TILE_WIDTH = 2 * TILE_RADIUS;
const TILE_HEIGHT = Math.sqrt(3) * TILE_RADIUS;
const FIELD_RADIUS = 3;

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
  tileWidth = TILE_WIDTH;
  tileHeight = TILE_HEIGHT;
  tiles: Map<Coords, Tile> = new Map();
  tiles$ = new ReplaySubject<Tile[]>(1);

  constructor() {
    const fieldRadius = FIELD_RADIUS;
    const fieldLeftOffset = /*fieldRadius * 3 / 4 * TILE_WIDTH*/ 200
    const fieldTopOffset = /*fieldRadius * 0.5 * TILE_HEIGHT*/ 50

    for (let q = fieldRadius * -1; q <= fieldRadius; q++) {
      for (let r = fieldRadius * -1; r <= fieldRadius; r++) {

        const coords = new Coords(
          q, r, 0 - q - r
        );

        if (coords.s >= fieldRadius * -1 && coords.s <= fieldRadius) {
          this.tiles.set(
            coords,
            new Tile
            (
              coords,
              fieldLeftOffset + (fieldRadius + q) * 3 / 4 * TILE_WIDTH,
              fieldTopOffset + (fieldRadius + r) * TILE_HEIGHT + q * 0.5 * TILE_HEIGHT,
            )
          )
        }
      }

      this.tiles$.next([...this.tiles.values()]);
    }
  }

  onMouseEnter(coords: Coords) {
    const field = this.tiles.get(coords);
    if (field) {
      field.mouseOver = true;
    }
  }

  onMouseLeave(coords: Coords) {
    const field = this.tiles.get(coords);
    if (field) {
      field.mouseOver = false;
    }
  }

  onMouseClick(coords: Coords) {
    const field = this.tiles.get(coords);
    if (field) {
      field.selected = !field.selected;
    }
  }
}
