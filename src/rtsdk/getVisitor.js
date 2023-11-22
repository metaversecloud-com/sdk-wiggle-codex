import { errorHandler } from "../utils/errorHandler.js";
import { Visitor } from "./topiaInit.js";

export const getVisitor = async (credentials) => {
  try {
    const { assetId, urlSlug, visitorId } = credentials;
    const visitor = await Visitor.get(visitorId, urlSlug, { credentials });
    if (!visitor || !visitor.username) throw "Not in world";

    await visitor.fetchDataObject();
    console.log("🚀 ~ file: getVisitor.js:16 ~ getVisitor ~ visitor.dataObject:", visitor.dataObject);
    try {
      const lockId = `${visitorId}-lastVisited-${new Date(Math.round(new Date().getTime() / 60000) * 60000)}`;
      if (!visitor.dataObject || !visitor.dataObject?.lastVisited) {
        await visitor.setDataObject({ lastVisited: Date.now() }, { lock: { lockId }, releaseLock: true });
      } else {
        await visitor.updateDataObject({ lastVisited: Date.now() }, { lock: { lockId }, releaseLock: true });
      }
    } catch (error) {
      errorHandler({ credentials, error, functionName: "getVisitor", message: "Error updating visitor object" });
    }

    if (!visitor.privateZoneId || visitor.privateZoneId !== assetId) {
      // Not in the private zone. Can watch, but can't play.
      visitor.username = null;
    }
    return { success: true, visitor };
  } catch (error) {
    const message = "Error getting visitor";
    errorHandler({ credentials, error, functionName: "getVisitor", message });
    return { message, success: false };
  }
};
