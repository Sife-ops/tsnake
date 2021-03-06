import Direction from "./Direction";
import Point from "./Point";

export default class Snake {
  private body: Array<Point> = [];
  private eating: boolean;
  private facing: Direction;

  constructor(w: number, h: number) {
    h = h / 2;
    w = w / 2;
    for (let i = 0; i < 3; i++) {
      this.body.push(new Point(w - i, h));
    }

    this.eating = false;
    this.facing = Direction.Right;
  }

  public getBody(): Array<Point> {
    return this.body;
  }

  public getHead(): Point {
    return this.body[0];
  }

  public setEating(b: boolean): void {
    this.eating = b;
  }

  public getFacing(): Direction {
    return this.facing;
  }

  public setFacing(d: Direction): void {
    switch (this.facing) {
      case Direction.Up:
        if (d === Direction.Down) {
          return;
        }
        break;
      case Direction.Down:
        if (d === Direction.Up) {
          return;
        }
        break;
      case Direction.Left:
        if (d === Direction.Right) {
          return;
        }
        break;
      case Direction.Right:
        if (d === Direction.Left) {
          return;
        }
        break;
    }
    this.facing = d;
  }

  private translate(): Point {
    const h: Point = this.getHead();
    let x: number = h.getx();
    let y: number = h.gety();

    switch (this.facing) {
      case Direction.Up:
        y = y - 1;
        break;
      case Direction.Down:
        y = y + 1;
        break;
      case Direction.Left:
        x = x - 1;
        break;
      case Direction.Right:
        x = x + 1;
        break;
    }

    return new Point(x, y);
  }

  public move(): void {
    this.body.unshift(this.translate());
    if (this.eating) {
      this.eating = false;
      return;
    }
    this.body.pop();
  }

  public hitSelf(): boolean {
    let h: Point = this.getHead();
    let b: Array<Point> = this.getBody().slice(1);
    for (let i = 0; i < b.length; i++) {
      if (b[i].equalTo(h)) {
        return true;
      }
    }
    return false;
  }
}
