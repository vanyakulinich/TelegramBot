import { firebase } from "../../config/db";
import { ID_DECODER } from "../../config/db";

class FirebaseBasic {
  constructor() {
    this.db = firebase.database();
  }
  get database() {
    return this;
  }

  registerCallback(data) {
    const [cbName, callback] = Object.entries(data)[0];
    this[cbName] = callback;
  }
}

export default class FirebaseAccess extends FirebaseBasic {
  constructor() {
    super();
  }
  _applyIdDecoder(id) {
    return id ^ ID_DECODER;
  }

  async _dbDataAccess(path) {
    try {
      const dbRef = await this.db.ref(path);
      const dbData = await dbRef.once("value");
      return { dbData, dbRef };
    } catch (err) {
      return false;
    }
  }

  async _dbDataValAccess(path) {
    const dbAccess = await this._dbDataAccess(path);
    if (!dbAccess) return false;
    const { dbRef, dbData } = dbAccess;
    return { dbRef, dbDataVal: dbData.val() };
  }
}
