import { terminal } from "terminal-kit";

import Direction from "./Direction";
import Point from "./Point";
import Snake from "./Snake";
import random from "./utility/random";
import sleep from "./utility/sleep";

export default class Game {
  private width: number;
  private height: number;
  private snake: Snake;
  private food: Array<Point> = [];
  private dead: boolean = false;

  constructor() {
    this.width = terminal.width;
    this.height = terminal.height;
    this.snake = new Snake(this.width, this.height);
    const items: number = (this.width * this.height) / 20;
    for (let i = 0; i < items; i++) {
      this.newFood();
    }
  }

  private hitFood(): boolean {
    const h: Point = this.snake.getHead();
    const f: Array<Point> = this.food;
    for (let i = 0; i < f.length; i++) {
      if (f[i].equalTo(h)) {
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
    if (x < 2 || x >= this.width - 1 || y < 2 || y >= this.height - 1) {
      return true;
    }
    return false;
  }

  public async run(): Promise<void> {
    this.render();

    terminal.grabInput({});

    function terminate() {
      terminal.grabInput(false);
      setTimeout(function () {
        process.exit();
      }, 100);
    }

    while (!this.dead) {
      // todo: change game speed
      for (let i = 0; i < 10; i++) {
        terminal.on("key", (name: string) => {
          switch (name) {
            case "CTRL_C":
              terminate();
              break;
            case "UP":
              this.snake.setFacing(Direction.Up);
              break;
            case "DOWN":
              this.snake.setFacing(Direction.Down);
              break;
            case "LEFT":
              this.snake.setFacing(Direction.Left);
              break;
            case "RIGHT":
              this.snake.setFacing(Direction.Right);
              break;
            default:
              break;
          }
        });
        await sleep(10);
      }

      this.snake.move();

      if (this.hitWall() || this.snake.hitSelf()) {
        this.dead = true;
        continue;
      }

      if (this.hitFood()) {
        this.snake.setEating(true);

        this.food = this.food.filter((e) => {
          const x = this.snake.getHead().getx();
          const y = this.snake.getHead().gety();
          if (x === e.getx() && y === e.gety()) {
            return false;
          }
          return true;
        });

        this.newFood();
      }

      this.render();
    }

    // todo: game over screen
    terminal.clear();
    terminal.grabInput(false);
  }
}
