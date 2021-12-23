import { terminal } from "terminal-kit";

import Snake from "./Snake";
import sleep from "./utility/sleep";

export default class Game {
  private width: number;
  private height: number;
  private snake: Snake;
  // todo: food
  private dead: boolean = false;

  constructor() {
    this.width = terminal.width;
    this.height = terminal.height;
    this.snake = new Snake(this.width, this.height);
  }

  private drawBox(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          //;
          y == 0 ||
          y == this.height - 1 ||
          x == 0 ||
          x == this.width - 1
        ) {
          terminal.moveTo(x, y);
          terminal.red("#");
        }
      }
    }
  }

  private drawSnake(): void {
    this.snake.getBody().forEach((p) => {
      terminal.moveTo(p.getx(), p.gety());
      terminal.green("@");
    });
  }

  public render(): void {
    terminal.clear();
    this.drawBox();
    this.drawSnake();
    // terminal.moveTo(1, 1);
  }

  private hitWall(): boolean {
    const h = this.snake.getHead();
    const x = h.getx();
    const y = h.gety();
    if (
      //;
      x < 1 ||
      x >= this.width - 1 ||
      y < 1 ||
      y >= this.height - 1
    ) {
      return true;
    }
    return false;
  }

  public async run(): Promise<void> {
    this.render();

    while (!this.dead) {
      await sleep(100);

      this.snake.move();

      if (this.hitWall() || this.snake.hitSelf()) {
        this.dead = true;
        continue;
      }

      this.render();
    }

    // todo: game over screen
  }
}
