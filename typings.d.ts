/// <reference types="graphql-typings" />

// support NodeJS modules without type definitions
declare module "*";

declare var System: SystemJS;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}
