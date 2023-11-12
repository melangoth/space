import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs';
import {Coords, Tile, World} from "../model/warlords.model";
import {WorldService} from "../services/world.service";
import * as _ from "lodash";


// https://www.redblobgames.com/grids/hexagons/#coordinates

const UP_LEFT = new Coords(-1, 0, 1);
const UP = new Coords(0, -1, +1);
const UP_RIGHT = new Coords(1, -1, 0);
const DOWN_RIGHT = new Coords(1, 0, -1);
const DOWN = new Coords(0, 1, -1);
const DOWN_LEFT = new Coords(-1, 1, 0);

@Component({
    selector: 'app-map',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {
    world: World | undefined;
    showCoordinates = false;
    showUnits = true;
    selectedTile: Tile | undefined;

    dragStart = {x: 0, y: 0}
    dragOffset = {x: 0, y: 0}

    constructor(private worldService: WorldService) {
    }

    ngOnInit() {
        this.worldService.world$.pipe(first()).subscribe(world => {
          this.world = world;
          const y = (_.maxBy(world.coords, 's')?.s || 0);
          const x = (_.minBy(world.coords, 'q')?.q || 0) * -1;
          this.dragOffset = {x: x * world.tileWidth * 3/4, y: y * world.tileHeight}
        });
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

    onDrag($event: DragEvent) {
        if ($event.x && $event.y) {
            this.dragOffset = {
                x: $event.x - this.dragStart.x,
                y: $event.y - this.dragStart.y
            }
        }
    }

    onDragStart($event: DragEvent) {
        this.dragStart = {x: $event.x - this.dragOffset.x, y: $event.y - this.dragOffset.y};
    }
}
