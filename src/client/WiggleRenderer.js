import { Renderer, TwoVector } from "@rtsdk/lance-topia";
import Wiggle from "../common/Wiggle";
import Food from "../common/Food";

let ctx = null;
let canvas = null;
let game = null;

export default class WiggleRenderer extends Renderer {
  constructor(gameEngine, clientEngine) {
    super(gameEngine, clientEngine);
    game = gameEngine;
    canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.insertBefore(canvas, document.getElementById("logo"));
    game.w = canvas.width;
    game.h = canvas.height;
    clientEngine.zoom = game.h / game.spaceHeight;
    if (game.w / game.spaceWidth < clientEngine.zoom) clientEngine.zoom = game.w / game.spaceWidth;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2 / clientEngine.zoom;
    ctx.strokeStyle = ctx.fillStyle = "white";
  }

  draw(t, dt) {
    super.draw(t, dt);

    // Clear the canvas
    ctx.clearRect(0, 0, game.w, game.h);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    ctx.translate(game.w / 2, game.h / 2); // Translate to the center
    ctx.scale(this.clientEngine.zoom, this.clientEngine.zoom); // Zoom in and flip y axis

    // Draw all things
    game.world.forEachObject((id, obj) => {
      if (obj instanceof Wiggle) this.drawWiggle(obj, t);
      else if (obj instanceof Food) this.drawFood(obj);
    });

    ctx.restore();
  }

  drawWiggle(w, time) {
    const playerColor = "#39FF14";
    const nonPlayerColor = "#2121DE";

    // draw head and body
    let isPlayer = w.playerId === this.gameEngine.playerId;
    let x = w.position.x;
    let y = w.position.y;
    if (isPlayer) ctx.fillStyle = playerColor;
    else ctx.fillStyle = nonPlayerColor;
    this.drawCircle(x, y, game.headRadius, true);
    for (let i = 0; i < w.bodyParts.length; i++) {
      let nextPos = w.bodyParts[i];
      if (isPlayer) ctx.fillStyle = playerColor;
      else ctx.fillStyle = nonPlayerColor;
      this.drawCircle(nextPos.x, nextPos.y, game.bodyRadius, true);
    }

    // draw eyes
    let angle = +w.direction;
    if (w.direction === game.directionStop) {
      angle = -Math.PI / 2;
    }
    let eye1 = new TwoVector(Math.cos(angle + game.eyeAngle), Math.sin(angle + game.eyeAngle));
    let eye2 = new TwoVector(Math.cos(angle - game.eyeAngle), Math.sin(angle - game.eyeAngle));
    eye1.multiplyScalar(game.eyeDist).add(w.position);
    eye2.multiplyScalar(game.eyeDist).add(w.position);
    ctx.fillStyle = "black";
    this.drawCircle(eye1.x, eye1.y, game.eyeRadius, true);
    this.drawCircle(eye2.x, eye2.y, game.eyeRadius, true);

    ctx.fillStyle = "white";
    const fontSize = 0.4;
    ctx.font = `${fontSize}px Arial`;
    var textToFill = w.name;
    ctx.fillText(textToFill, x - textToFill.length / (4 / fontSize), y - 0.2);
    ctx.fillStyle = "white";

    // update status
    const timeInt = parseInt(time);
    // Only update DOM on every 18th or so draw
    if (isPlayer && timeInt % 18 === 0) {
      document.getElementById("wiggle-length").innerHTML = "Your Length: " + w.bodyParts.length;
      document.getElementById("score").innerHTML = "Your Score: " + w.score;
    }
  }

  drawFood(f) {
    ctx.strokeStyle = ctx.fillStyle = "#FD0000";

    this.drawCircle(f.position.x, f.position.y, game.foodRadius, true);
    ctx.strokeStyle = ctx.fillStyle = "White";
  }

  drawCircle(x, y, radius, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    fill ? ctx.fill() : ctx.stroke();
    ctx.closePath();
  }

  drawBounds() {
    ctx.beginPath();
    ctx.moveTo(-game.spaceWidth / 2, -game.spaceHeight / 2);
    ctx.lineTo(-game.spaceWidth / 2, game.spaceHeight / 2);
    ctx.lineTo(game.spaceWidth / 2, game.spaceHeight / 2);
    ctx.lineTo(game.spaceWidth / 2, -game.spaceHeight / 2);
    ctx.lineTo(-game.spaceWidth / 2, -game.spaceHeight / 2);
    ctx.closePath();
    ctx.stroke();
  }
}
