export default class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public setx(v: number): void {
    if (v < 0) {
      return;
    }
    this.x = v;
  }

  public sety(v: number): void {
    if (v < 0) {
      return;
    }
    this.x = v;
  }

  public getx(): number {
    return this.x;
  }

  public gety(): number {
    return this.y;
  }
}

