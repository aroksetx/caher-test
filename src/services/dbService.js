import { SQLite } from "expo";

export default class ApplicationDb {
  constructor(dbName) {
    this.db = SQLite.openDatabase(dbName);
    this.db.transaction(trans =>
      trans.executeSql(
        "create table if not exists locations (id integer primary key not null, name text, description text, lat integer, lng integer)"
      )
    );
  }

  getItems() {
    return new Promise((resolve, reject) => {
      this.db.readTransaction(trans => {
        trans.executeSql(
          "select * from locations",
          [],
          (_, { rows }) => resolve(JSON.stringify(rows)),
          (_, { message }) => reject(message)
        );
      });
    });
  }

  updateItem() {
      this.db.transaction(trans => {
          trans.executeSql(`update locations set done = 1 where id = ?;`, [id]);
      });
  }

  addItem(name, description, lat, lng) {
      return new Promise((resolve, reject) => {
        this.db.transaction(
            trans => {
                trans.executeSql(
              "insert into locations (name, description, lat, lng) values (?, ?, ?, ?)",
              [name, description, lat, lng]
            );
          },
          error => reject(error),
          succes => resolve(succes)
        );
      });
  }
}
