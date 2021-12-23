import Point from "./Point";
import Snake from "./Snake";

function main() {
  const p = new Point(1, 2);
  const s = new Snake();

  console.log(s.hitSelf())
}

main();
