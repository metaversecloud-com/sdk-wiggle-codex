# Repository Overview

This project contains a networked multiplayer "snake" style game called **Wiggle**, which utilizes [Topia SDK](https://metaversecloud-com.github.io/mc-sdk-js) and [Lance.gg](https://lance-gg.github.io/). The README briefly introduces the gameplay and how players interact with it:

### How To Play
- Users can play by walking inside of the game asset’s private zone
- Users can ‘spectate’ by clicking on the game asset while outside the private zone
- Nobody is able to join the game or spectate if they are not in the world
- Click “Join Game” to create a wiggle and join the game.
- Use your mouse to move your wiggle.
- If your wiggle is blocked (runs into) another wiggle, your game ends - try again.
- If you block another wiggle, you get a point.
- Blocking bots doesn’t give you a point.
- If you block a bot, your wiggle increases by ¼ of the bot’s length.
- If you block a player, your wiggle increases by ½ of that player’s length.
- Your wiggle will also shrink over time. The bigger it gets, the faster it shrinks.
```

## Structure

```text
src/
 ├─ client/            → browser-side logic and rendering
 ├─ common/            → shared game objects and engine
 ├─ rtsdk/             → helpers for Topia SDK integration
 ├─ server/            → server-side game engine and utilities
 ├─ utils/             → helper functions (analytics, version, error logging)
 └─ main.js            → Express/Socket.IO server setup
dist/                  → bundled client assets
dist-server/           → transpiled server code
```

## Server

`src/main.js` starts the Express server, serves `dist/index.html`, and exposes a health endpoint. It also instantiates the Lance-based game engines:

```javascript
const server = express();
server.get("/", function (req, res) { res.sendFile(INDEX); });
server.get("/system/health", (req, res) => {
  return res.json({
    appVersion: getVersion(),
    status: "OK",
  });
});
server.use("/", express.static(path.join(__dirname, "../dist/")));
let requestHandler = server.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(requestHandler);
const gameEngine = new WiggleGameEngine({ traceLevel: Lib.Trace.TRACE_ALL });
const serverEngine = new WiggleServerEngine(io, gameEngine, { updateRate: 2, fullSyncRate: 12, timeoutInterval: 600 });
// start the game
serverEngine.start();
```

`WiggleServerEngine` handles room creation, visitor validation, AI wiggles, and game events such as collisions and scoring. It uses the Topia SDK to verify whether a user is inside the interactive zone.

Key portions from `joinRoom` (joining a game session):

```javascript
async joinRoom(socket) {
  const URL = socket.handshake.headers.referer;
  const parts = url.parse(URL, true);
  const query = parts.query;
  const { assetId, displayName, identityId, urlSlug } = query;
  const roomName = assetId;
  const { success, visitor, isInZone } = await getVisitor(query);
  this.visitor = visitor;
  if (!this.rooms || !this.rooms[roomName]) {
    super.createRoom(roomName);
    this.generateRoom(roomName);
  }
}
```

The server tracks collisions, feeding, and AI movement in `stepLogic`:

```javascript
stepLogic(stepObj) {
  let foodObjects = this.gameEngine.world.queryObjects({ instanceType: Food });
  if (stepObj.step % 500 === 0) this.getRoomsWithPlayers();
  for (let w of wiggles) {
    if (!this.roomPopulation[w.roomName] || !this.rooms[w.roomName]) continue;
    for (let w2 of wiggles) {
      if (w === w2 || w.roomName !== w2.roomName) continue;
      for (let i = 0; i < w2.bodyParts.length; i++) {
        let distance = w2.bodyParts[i].clone().subtract(w.position);
        if (distance.length() < this.gameEngine.collideDistance) {
          this.wiggleHitWiggle(w, w2);
        }
      }
    }
  }
}
```

## Game Logic

`WiggleGameEngine` in `common/` defines physics, object movement, and serializable state:

```javascript
constructor(options) {
  super(options);
  this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this, collisions: { autoResolve: false } });
  // game variables
  Object.assign(this, {
    foodRadius: 0.13,
    headRadius: 0.1,
    bodyRadius: 0.2,
    eyeDist: 0.12,
    aiCount: 1,
    directionStop: 100,
  });
}
```

Movement for every wiggle is performed during the `preStep` phase:

```javascript
moveAll(stepInfo) {
  if (stepInfo.isReenact) return;
  this.world.forEachObject((id, obj) => {
    if (obj instanceof Wiggle) {
      let pos = obj.position.clone();
      if (obj.bodyParts.length === 0 || pos.subtract(obj.bodyParts[obj.bodyParts.length - 1]).length() > 0.05) {
        obj.bodyParts.push(obj.position.clone());
        while (obj.bodyLength < obj.bodyParts.length) obj.bodyParts.shift();
      }
      if (obj.direction === this.directionStop) return;
      let move = new TwoVector(Math.cos(obj.direction), Math.sin(obj.direction));
      move.multiplyScalar(this.moveDist);
      obj.position.add(move);
    }
  });
}
```

`Wiggle.js` defines the schema used to sync wiggles across network clients:

```javascript
static get netScheme() {
  return Object.assign(
    {
      direction: { type: BaseTypes.TYPES.FLOAT32 },
      bodyLength: { type: BaseTypes.TYPES.INT16 },
      score: { type: BaseTypes.TYPES.INT16 },
      name: { type: BaseTypes.TYPES.STRING },
    },
    super.netScheme,
  );
}
```

## Client

The client entry point sets up the local game and connects to the server:

```javascript
const defaults = {
  traceLevel: Lib.Trace.TRACE_NONE,
  delayInputCount: 5,
  scheduler: "render-schedule",
  syncOptions: { sync: qsOptions.sync || "interpolate", bendingIncrements: 5 },
};
const gameEngine = new WiggleGameEngine(options);
const clientEngine = new WiggleClientEngine(gameEngine, options);
document.addEventListener("DOMContentLoaded", function (e) { clientEngine.start(); });
```

`WiggleClientEngine` captures mouse movement and communicates with the server:

```javascript
document.addEventListener("mousemove", this.updateMouseXY.bind(this), false);
this.gameEngine.on("client__preStep", this.sendMouseAngle.bind(this));
...
sendMouseAngle() {
  let player = this.gameEngine.world.queryObject({ playerId: this.gameEngine.playerId });
  if (this.mouseY === null || player === null) return;
  let angle = Math.atan2(dx, dy);
  this.sendInput(angle, { movement: true });
}
```

`WiggleRenderer` draws each wiggle and food item:

```javascript
// Clear the canvas
ctx.clearRect(0, 0, game.w, game.h);
...
// Draw all things
game.world.forEachObject((id, obj) => {
  if (obj instanceof Wiggle) this.drawWiggle(obj, t);
  else if (obj instanceof Food) this.drawFood(obj);
});
```

## Utilities

The `utils/` folder includes helpers for analytics and error handling. For example, `addNewRowToGoogleSheets` posts gameplay events to a Google Sheet if credentials are provided:

```javascript
export const addNewRowToGoogleSheets = async (SSAEvents) => {
  try {
    if (!process.env.GOOGLESHEETS_SHEET_ID) return;
    await sheetsClient.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLESHEETS_SHEET_ID,
      range: process.env.GOOGLESHEETS_SHEET_RANGE || "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [...data] },
    });
  } catch (err) {
    console.error(err);
  }
};
```

## Build & Deployment

- Uses Babel and Webpack to transpile and bundle JavaScript.
- `package.json` scripts show how to build, run, or debug:
  - `npm run build` → webpack + babel.
  - `npm start` → run compiled server from `dist-server`.

**Dockerfile** sets up an Alpine-based Node container to run the compiled server:

```Dockerfile
FROM --platform=linux/arm64 node:18-alpine3.17
WORKDIR /app
ADD dist ./dist
ADD src ./src
COPY package.json .
...
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

## Next Steps to Learn

1. **Understand Lance/RT SDK** – The game engine relies on `@rtsdk/lance-topia` and `lance-gg`, which handle synchronization and physics for multiplayer. Exploring these libraries will clarify how network updates and prediction work.
2. **Topia SDK Integration** – Files in `src/rtsdk` use Topia’s API to validate visitors and log analytics. Learning the Topia SDK will help when extending the game or deploying it inside Topia worlds.
3. **Build System** – Familiarize yourself with Babel, Webpack, and the `npm` scripts. They compile the ES6+ code and bundle the client.
4. **Analytics and Environment Variables** – The game optionally records events to Google Sheets. Review `.env` variables (`GOOGLESHEETS_*`, `INTERACTIVE_KEY`, etc.) and the health endpoint for debugging deployments.
5. **Game Logic Extensions** – The basic gameplay is contained in `WiggleGameEngine` and `WiggleServerEngine`. To add features, you’d likely modify or extend these classes and possibly update the Renderer or ClientEngine.

Overall, the repo offers a straightforward real-time multiplayer example powered by Lance and integrated with Topia for visitor management and analytics.
