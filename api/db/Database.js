import { firebase } from "../../config/db";

export default class FirebaseBasic {
  constructor() {
    // super();
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

// export default class FirebaseDatabase extends Database {
//   constructor() {
//     super();
//     this.db = firebase.database();
//   }

// }
