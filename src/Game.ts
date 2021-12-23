import { terminal } from "terminal-kit";

import Point from "./Point";
import Snake from "./Snake";
import random from "./utility/random";
import sleep from "./utility/sleep";

export default class Game {
  private width: number;
  private height: number;
  private snake: Snake;
  private food: Array<Point>;
  private dead: boolean;

  constructor() {
    this.width = terminal.width;
    this.height = terminal.height;
    this.snake = new Snake(this.width, this.height);

    const items: number = (this.width * this.height) / 200;
    this.food = [];
    for (let i = 0; i < items; i++) {
      this.newFood();
    }

    this.dead = false;
  }

  private ate(): boolean {
    // todo: move to Point
    const h: Point = this.snake.getHead();
    const x1: number = h.getx();
    const y1: number = h.gety();
    const f: Array<Point> = this.food;
    for (let i = 0; i < f.length; i++) {
      const x2: number = f[i].getx();
      const y2: number = f[i].gety();
      if (x1 == x2 && y1 == y2) {
        return true;
      }
    }
    return false;
  }

  private newFood(): void {
    while (true) {
      const x = random(2, this.width - 2);
      const y = random(2, this.height - 2);
      const p = new Point(x, y);
      if (this.snake.getBody().includes(p)) {
        continue;
      }
      this.food.push(p);
      return;
    }
  }

  private drawBox(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1) {
          terminal.moveTo(x, y);
          terminal.red("#");
        }
      }
    }
  }

  private drawFood(): void {
    this.food.forEach((p) => {
      terminal.moveTo(p.getx(), p.gety());
      terminal.yellow("*");
    });
  }

  // todo: prettier snake
  private drawSnake(): void {
    this.snake.getBody().forEach((p) => {
      terminal.moveTo(p.getx(), p.gety());
      terminal.green("@");
    });
  }

  public render(): void {
    terminal.clear();
    this.drawBox();
    this.drawFood();
    this.drawSnake();
    terminal.moveTo(0, 0);
  }

  private hitWall(): boolean {
    const h = this.snake.getHead();
    const x = h.getx();
    const y = h.gety();
    if (x < 1 || x >= this.width - 1 || y < 1 || y >= this.height - 1) {
      return true;
    }
    return false;
  }

  public async run(): Promise<void> {
    this.render();

    while (!this.dead) {
      await sleep(200);

      this.snake.move();

      if (this.hitWall() || this.snake.hitSelf()) {
        this.dead = true;
        continue;
      }

      if (this.ate()) {
        this.snake.setEating(true);
        this.newFood();
      }

      this.render();
    }

    // todo: game over screen
    terminal.clear();
  }
}
