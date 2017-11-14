// Type definitions for nosql v6.1.0
// Project: https://github.com/petersirka/nosql
// Definitions by: Benjamin Jesuiter https://github.com/bjesuiter
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// import { DatabaseBinary } from './database-binary';
// import { DatabaseCounter } from './database-counter';
import { DatabaseBuilder } from './database-builder';

declare module 'nosql' {

    //TODO: type more strictly to Error and Stats
    type BackupCallback = (err: any, stats?: any) => void;

     class Database {
        // binary: DatabaseBinary;
        // counter: DatabaseCounter;

        /**
         * CHANGELOG: +v2.8.0 changed this method completely,
         * this method backups all files from this database to Total.js Package file.
         * OLDER METHOD has been moved to `database.backup2()`
         *
         * This method backups database, counter, meta-info and all binary files.
         *
         * @param {string} filename - A backup filename (needs a full path).
         * @param {"nosql".BackupCallback} callback - optional - A callback
         * @return {"nosql".Database}
         */
        public backup(filename: string, callback?: BackupCallback): Database;

        /**
         * CHANGELOG: +v2.8.0 - this is the previous version of `database.backup()`
         *
         * Backups a database. The method can backup a whole file (any document won't be removed)
         * or specific documents (documents will be moved to the backup file and they will be removed).
         *
         * @param {string} filename - A backup filename (needs a full path).
         * @param {boolean} remove - optional - Does remove data after backup?
         */
        public backup2(filename: string, remove?: boolean): DatabaseBuilder;

        /**
         * Gets count of documents.
         *
         * @param {string} viewname - optionalThe DB will search in a view.
         */
        count(viewname?: string): DatabaseBuilder;

        /**
         * Removes the database.
         */
        drop(): Database;

        /**
         * Finds documents in the database.
         * @param {string} viewname - optionalThe DB will search in a view.
         */
        find(viewname?: string): DatabaseBuilder;

        /**
         * It reads a value according to key from meta-data of database. Alias for database.meta().
         *
         * @param {string} key - The key.
         */
        get(key: string): any;

        /**
         * Inserts a document into the database.
         *
         * @param document - This document will be stored in DB file.
         * @param {boolean} unique - optional - Checks whether document exists in DB.
         */
        insert(document: any, unique?: boolean): DatabaseBuilder;

        /**
         * Can read and write value as meta information. When is not defined value
         * then database read a value from meta information according to the key.
         *
         * @param {string} key - The key.
         * @param value - optional - This value will be stored.
         * @return {"nosql".Database | any}
         */
        meta(key: string, value: any): Database | any;

        /**
         * Modifies specific values in the database.
         * @param doc - Properties from this document will be modified in DB file.
         * @param {any | boolean} newDoc - optional -
         * This document will be stored if the updated document doesn't exist. `true` inserts first `doc` as a new document.
         * @return {DatabaseBuilder}
         */
        modify(doc: any, newDoc?: any | boolean): DatabaseBuilder;

        /**
         * Finds only one document in the database.
         * @param {string} viewname - optional - The DB will search in a view.
         * @return {DatabaseBuilder}
         */
        one(viewname?: string): DatabaseBuilder;

        /**
         * IMPORTANT: this method refreshes all views (executes reload).
         * @return {"nosql".Database}
         */
        refresh(): Database;

        /**
         * Release in-memory database.
         * @return {DatabaseBuilder}
         */
        release(): DatabaseBuilder;

        /**
         * Removes a document in the database.
         * @param {string} backup - optional - An absolute backup filename (removed documents will be stored in this backup).
         */
        remove(backup?: string): DatabaseBuilder;

        /**
         * This method restores database, counter, meta-info and all binary files.
         * @param {string} filename - A filename (needs a full path).
         * @param {"nosql".BackupCallback} callback - optional - A callback
         * @return {"nosql".Database}
         */
        restore(filename: string, callback?: BackupCallback): Database;

        /**
         * Performs a scalar operation.
         * @param {string} type - A scalar operation type `min`, `max`, `sum`, `avg`, `count` or `group`.
         * @param {string} field - optional - A field name (optional when the type is `count` or `group`).
         */
        scalar(type: string, field?: string): DatabaseBuilder;

        /**
         * It sets a new value to database meta-data. Alias for database.meta()
         * @param {string} key - The key.
         * @param value - optional - This value will be stored.
         * @return {"nosql".Database}
         */
        set(key: string, value?: any): Database;

        /**
         * Finds first top documents in the database.
         * @param {number} max - First top/max documents.
         * @param {string} viewname - optional - The DB will search in a view.
         */
        top(max: number, viewname?: string);

        /**
         * Updates a document in the database.
         * @param doc - This document will be updated in DB file.
         * @param {boolean | any} newDoc - optional - This document will be stored if the updated document doesn't exist.
         * `true` inserts first `doc` as a new document.
         * @return {DatabaseBuilder}
         */
        update(doc: any, newDoc?: boolean | any): DatabaseBuilder;

        /**
         * Register/Create a new view file. All documents (new, updated, modified and removed)
         * will be prepared according to the DatabaseBuilder. So if you change a data in DB via database.update()
         * and other similar methods then the database prepares all views according their filters automatically.
         * @param {string} viewname - View name.
         * @return {DatabaseBuilder}
         */
        view(viewname: string): DatabaseBuilder;

         //Events
         //-------

         /**
          * Is triggered if a document is inserted into the database.
          * @param {"insert"} event
          * @param {(doc: any) => void} listener - A document as parameter.
          * @return {this}
          */
         on(event: 'insert', listener: (doc: any) => void): Database;

         /**
          * Is triggered if a document is modified in the database.
          * @param {"modify"} event
          * @param {(doc: any) => void} listener - A document as parameter.
          * @return {this}
          */
         on(event: 'modify', listener: (doc: any) => void): Database;

         /**
          * Is triggered if a document is updated in the database.
          * @param {"update"} event
          * @param {(doc: any) => void} listener - A document as parameter.
          * @return {this}
          */
         on(event: 'update', listener: (doc: any) => void): Database;

         /**
          * Is triggered if a document is removed from the database.
          * @param {"delete"} event
          * @param {(doc: any) => void} listener - A document as parameter.
          * @return {this}
          */
         on(event: 'delete', listener: (doc: any) => void): this;

    }

    function load(filename: string): Database;
}

