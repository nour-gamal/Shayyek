import { GetResource, PostResource } from "./../../Services";

// function /api/Session/GetSuppliersAndContratorsThatFilledRFQ

export function GetSuppliersAndContratorsThatFilledRFQ(rfqId, success, fail) {
  const path = `api/Session/GetSuppliersAndContratorsThatFilledRFQ?rfqId=${rfqId}`;
  GetResource(path, success, fail, true);
}

export function AddOnlineSession(data, success, fail) {
  const path = `api/Session/AddOnlineSession`;
  PostResource(path, data, success, fail, true);
}
