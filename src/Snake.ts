import Point from "./Point";
import Direction from "./Direction";

export default class Snake {
  private body: Array<Point>;
  private eating: boolean = false;
  private facing: Direction = Direction.Right;

  constructor(w: number, h: number) {
    h = h / 2;
    w = w / 2;

    this.body = [];
    for (let i = 0; i < 3; i++) {
      this.body.push(new Point(w - i, h));
    }
  }

  public getBody(): Array<Point> {
    return this.body;
  }

  public getHead(): Point {
    return this.body[0];
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
    if (b.includes(h)) {
      return true;
    }
    return false;
  }
}
