// Type definitions for nosql v6.1.0
// Project: https://github.com/petersirka/nosql
// Definitions by: Benjamin Jesuiter https://github.com/bjesuiter
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// import { DatabaseBinary } from './database-binary';
// import { DatabaseCounter } from './database-counter';

declare module "nosql" {

    class Database {
        // binary: DatabaseBinary;
        // counter: DatabaseCounter;
    }

    function load(filename: string): Database;

}

