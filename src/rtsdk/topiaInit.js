import dotenv from "dotenv";
dotenv.config();

const { AssetFactory, DroppedAssetFactory, Topia, VisitorFactory } = require("@rtsdk/topia/dist/index.cjs");

const config = {
  apiDomain: process.env.INSTANCE_DOMAIN || "api.topia.io",
  apiProtocol: process.env.INSTANCE_PROTOCOL || "https",
  interactiveKey: process.env.INTERACTIVE_KEY,
  interactiveSecret: process.env.INTERACTIVE_SECRET,
};

const myTopiaInstance = new Topia(config);

const Asset = new AssetFactory(myTopiaInstance);
const DroppedAsset = new DroppedAssetFactory(myTopiaInstance);
const Visitor = new VisitorFactory(myTopiaInstance);

export { Asset, DroppedAsset, Visitor };
