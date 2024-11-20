import { errorHandler } from "../utils/errorHandler.js";
import { Visitor } from "./topiaInit.js";

export const getVisitor = async (credentials) => {
  try {
    const { assetId, urlSlug, visitorId } = credentials;
    const visitor = await Visitor.get(visitorId, urlSlug, { credentials });
    if (!visitor) throw "Not in world";

    let isInZone = true;
    const landmarkZonesArray = visitor.landmarkZonesString.split(",");
    if (!landmarkZonesArray.includes(assetId) && visitor.privateZoneId !== assetId) {
      isInZone = false;
      console.log("Visitor is not in zone");
      // Not in the zone. Can watch, but can't play.
    }
    return { success: true, visitor, isInZone };
  } catch (error) {
    const message = "Error getting visitor";
    errorHandler({ credentials, error, functionName: "getVisitor", message });
    return { message, success: false };
  }
};
