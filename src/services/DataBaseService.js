import { SQLite } from 'expo';

export default class DataBaseService {
    constructor(dbName) {
        this.db = SQLite.openDatabase(dbName, '1.0');
        this.db.transaction(trans =>
            trans.executeSql(
                `create table if not exists locations (id integer primary key not null, name text, description text, lat integer, lng integer)`
            )
        );

    }

    getItems() {
        return new Promise((resolve, reject) => {
            this.db.readTransaction(trans => {
                trans.executeSql(
                    `select * from locations`, [],
                    (_, {rows}) => resolve(rows),
                    (_, {message}) => reject(message)
                );
            });
        });
    }

    isCoordinatesExist({lat, lng}) {
        return new Promise((resolve, reject) => {
            this.db.readTransaction(trans => {
                trans.executeSql(
                    `select * from locations where lat=? and lng=?`, [lat, lng],
                    (_, {rows}) => resolve(rows),
                    (_, {message}) => reject(message)
                );
            });
        });
    }

    removerItem({lat, lng}) {
        this.db.transaction(trans => {
            trans.executeSql(`delete from locations where lat=? and lng=?`, [lat, lng])
        });
    }

    updateItem(name, description, lat, lng) {
        this.db.transaction(trans => {
            trans.executeSql(
                `update locations set name = ?, description =?  where lat=? and lng=?`,
                [name, description, lat, lng]
            );
        });
    }

    addItem(name, description, lat, lng) {
        return new Promise((resolve, reject) => {
            this.db.transaction(
                trans => {
                    trans.executeSql(
                        `insert into locations (name, description, lat, lng) values (?, ?, ?, ?)`,
                        [name, description, lat, lng]
                    );
                },
                error => reject(error),
                succes => resolve(succes)
            );
        });
    }
}
