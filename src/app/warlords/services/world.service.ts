import {Injectable} from "@angular/core";
import {Coords, Unit, World} from "../model/warlords.model";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorldService {
  public readonly fieldRadius = 3;

  get world$(): Observable<World> {
    const coords: Coords[] = [];
    for (let q = this.fieldRadius * -1; q <= this.fieldRadius; q++) {
      for (let r = this.fieldRadius * -1; r <= this.fieldRadius; r++) {
        const s = 0 - q - r;
        if (s >= this.fieldRadius * -1 && s <= this.fieldRadius) {
          coords.push(new Coords(q, r, s));
        }
      }
    }

    return of(new World(
      'Dummy World',
      coords,
      [
        new Unit(new Coords(1, -2, 1), 'c', 3),
        new Unit(new Coords(1, -2, 1), 'i', 7),
        new Unit(new Coords(1, -1, 0), 'i', 10)
      ]
    ));
  }
}
