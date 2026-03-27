
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Market
 * 
 */
export type Market = $Result.DefaultSelection<Prisma.$MarketPayload>
/**
 * Model ExternalEvent
 * 
 */
export type ExternalEvent = $Result.DefaultSelection<Prisma.$ExternalEventPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Pick
 * 
 */
export type Pick = $Result.DefaultSelection<Prisma.$PickPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DisplayType: {
  ONE_X_TWO: 'ONE_X_TWO',
  OVER_UNDER: 'OVER_UNDER',
  ONE_FROM_TWO: 'ONE_FROM_TWO',
  PLAYER_PROPS: 'PLAYER_PROPS',
  PLAYER_PROPS_SINGLE: 'PLAYER_PROPS_SINGLE'
};

export type DisplayType = (typeof DisplayType)[keyof typeof DisplayType]


export const GameStatus: {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  COMPLETED: 'COMPLETED'
};

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]


export const PrizeType: {
  CASH: 'CASH',
  FREE_BET: 'FREE_BET'
};

export type PrizeType = (typeof PrizeType)[keyof typeof PrizeType]

}

export type DisplayType = $Enums.DisplayType

export const DisplayType: typeof $Enums.DisplayType

export type GameStatus = $Enums.GameStatus

export const GameStatus: typeof $Enums.GameStatus

export type PrizeType = $Enums.PrizeType

export const PrizeType: typeof $Enums.PrizeType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Markets
 * const markets = await prisma.market.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Markets
   * const markets = await prisma.market.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.market`: Exposes CRUD operations for the **Market** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Markets
    * const markets = await prisma.market.findMany()
    * ```
    */
  get market(): Prisma.MarketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.externalEvent`: Exposes CRUD operations for the **ExternalEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExternalEvents
    * const externalEvents = await prisma.externalEvent.findMany()
    * ```
    */
  get externalEvent(): Prisma.ExternalEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pick`: Exposes CRUD operations for the **Pick** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Picks
    * const picks = await prisma.pick.findMany()
    * ```
    */
  get pick(): Prisma.PickDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Market: 'Market',
    ExternalEvent: 'ExternalEvent',
    Game: 'Game',
    Player: 'Player',
    Pick: 'Pick'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "market" | "externalEvent" | "game" | "player" | "pick"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Market: {
        payload: Prisma.$MarketPayload<ExtArgs>
        fields: Prisma.MarketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findFirst: {
            args: Prisma.MarketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findMany: {
            args: Prisma.MarketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          create: {
            args: Prisma.MarketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          createMany: {
            args: Prisma.MarketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          delete: {
            args: Prisma.MarketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          update: {
            args: Prisma.MarketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          deleteMany: {
            args: Prisma.MarketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          upsert: {
            args: Prisma.MarketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          aggregate: {
            args: Prisma.MarketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarket>
          }
          groupBy: {
            args: Prisma.MarketGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketCountArgs<ExtArgs>
            result: $Utils.Optional<MarketCountAggregateOutputType> | number
          }
        }
      }
      ExternalEvent: {
        payload: Prisma.$ExternalEventPayload<ExtArgs>
        fields: Prisma.ExternalEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExternalEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExternalEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          findFirst: {
            args: Prisma.ExternalEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExternalEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          findMany: {
            args: Prisma.ExternalEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>[]
          }
          create: {
            args: Prisma.ExternalEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          createMany: {
            args: Prisma.ExternalEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExternalEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>[]
          }
          delete: {
            args: Prisma.ExternalEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          update: {
            args: Prisma.ExternalEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          deleteMany: {
            args: Prisma.ExternalEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExternalEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExternalEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>[]
          }
          upsert: {
            args: Prisma.ExternalEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalEventPayload>
          }
          aggregate: {
            args: Prisma.ExternalEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternalEvent>
          }
          groupBy: {
            args: Prisma.ExternalEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExternalEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExternalEventCountArgs<ExtArgs>
            result: $Utils.Optional<ExternalEventCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Pick: {
        payload: Prisma.$PickPayload<ExtArgs>
        fields: Prisma.PickFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PickFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PickFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          findFirst: {
            args: Prisma.PickFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PickFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          findMany: {
            args: Prisma.PickFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>[]
          }
          create: {
            args: Prisma.PickCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          createMany: {
            args: Prisma.PickCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PickCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>[]
          }
          delete: {
            args: Prisma.PickDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          update: {
            args: Prisma.PickUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          deleteMany: {
            args: Prisma.PickDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PickUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PickUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>[]
          }
          upsert: {
            args: Prisma.PickUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PickPayload>
          }
          aggregate: {
            args: Prisma.PickAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePick>
          }
          groupBy: {
            args: Prisma.PickGroupByArgs<ExtArgs>
            result: $Utils.Optional<PickGroupByOutputType>[]
          }
          count: {
            args: Prisma.PickCountArgs<ExtArgs>
            result: $Utils.Optional<PickCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    market?: MarketOmit
    externalEvent?: ExternalEventOmit
    game?: GameOmit
    player?: PlayerOmit
    pick?: PickOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ExternalEventCountOutputType
   */

  export type ExternalEventCountOutputType = {
    games: number
  }

  export type ExternalEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | ExternalEventCountOutputTypeCountGamesArgs
  }

  // Custom InputTypes
  /**
   * ExternalEventCountOutputType without action
   */
  export type ExternalEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEventCountOutputType
     */
    select?: ExternalEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExternalEventCountOutputType without action
   */
  export type ExternalEventCountOutputTypeCountGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    picks: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    picks?: boolean | GameCountOutputTypeCountPicksArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPicksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PickWhereInput
  }


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    picks: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    picks?: boolean | PlayerCountOutputTypeCountPicksArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountPicksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PickWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Market
   */

  export type AggregateMarket = {
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  export type MarketAvgAggregateOutputType = {
    id: number | null
    marketId: number | null
  }

  export type MarketSumAggregateOutputType = {
    id: number | null
    marketId: number | null
  }

  export type MarketMinAggregateOutputType = {
    id: number | null
    name: string | null
    marketId: number | null
    displayType: $Enums.DisplayType | null
    enabled: boolean | null
    superSubEligible: boolean | null
    createdAt: Date | null
  }

  export type MarketMaxAggregateOutputType = {
    id: number | null
    name: string | null
    marketId: number | null
    displayType: $Enums.DisplayType | null
    enabled: boolean | null
    superSubEligible: boolean | null
    createdAt: Date | null
  }

  export type MarketCountAggregateOutputType = {
    id: number
    name: number
    marketId: number
    displayType: number
    enabled: number
    superSubEligible: number
    createdAt: number
    _all: number
  }


  export type MarketAvgAggregateInputType = {
    id?: true
    marketId?: true
  }

  export type MarketSumAggregateInputType = {
    id?: true
    marketId?: true
  }

  export type MarketMinAggregateInputType = {
    id?: true
    name?: true
    marketId?: true
    displayType?: true
    enabled?: true
    superSubEligible?: true
    createdAt?: true
  }

  export type MarketMaxAggregateInputType = {
    id?: true
    name?: true
    marketId?: true
    displayType?: true
    enabled?: true
    superSubEligible?: true
    createdAt?: true
  }

  export type MarketCountAggregateInputType = {
    id?: true
    name?: true
    marketId?: true
    displayType?: true
    enabled?: true
    superSubEligible?: true
    createdAt?: true
    _all?: true
  }

  export type MarketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Market to aggregate.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Markets
    **/
    _count?: true | MarketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketMaxAggregateInputType
  }

  export type GetMarketAggregateType<T extends MarketAggregateArgs> = {
        [P in keyof T & keyof AggregateMarket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarket[P]>
      : GetScalarType<T[P], AggregateMarket[P]>
  }




  export type MarketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketWhereInput
    orderBy?: MarketOrderByWithAggregationInput | MarketOrderByWithAggregationInput[]
    by: MarketScalarFieldEnum[] | MarketScalarFieldEnum
    having?: MarketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketCountAggregateInputType | true
    _avg?: MarketAvgAggregateInputType
    _sum?: MarketSumAggregateInputType
    _min?: MarketMinAggregateInputType
    _max?: MarketMaxAggregateInputType
  }

  export type MarketGroupByOutputType = {
    id: number
    name: string
    marketId: number
    displayType: $Enums.DisplayType
    enabled: boolean
    superSubEligible: boolean
    createdAt: Date
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  type GetMarketGroupByPayload<T extends MarketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketGroupByOutputType[P]>
            : GetScalarType<T[P], MarketGroupByOutputType[P]>
        }
      >
    >


  export type MarketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marketId?: boolean
    displayType?: boolean
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marketId?: boolean
    displayType?: boolean
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marketId?: boolean
    displayType?: boolean
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectScalar = {
    id?: boolean
    name?: boolean
    marketId?: boolean
    displayType?: boolean
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: boolean
  }

  export type MarketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "marketId" | "displayType" | "enabled" | "superSubEligible" | "createdAt", ExtArgs["result"]["market"]>

  export type $MarketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Market"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      marketId: number
      displayType: $Enums.DisplayType
      enabled: boolean
      superSubEligible: boolean
      createdAt: Date
    }, ExtArgs["result"]["market"]>
    composites: {}
  }

  type MarketGetPayload<S extends boolean | null | undefined | MarketDefaultArgs> = $Result.GetResult<Prisma.$MarketPayload, S>

  type MarketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketCountAggregateInputType | true
    }

  export interface MarketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Market'], meta: { name: 'Market' } }
    /**
     * Find zero or one Market that matches the filter.
     * @param {MarketFindUniqueArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketFindUniqueArgs>(args: SelectSubset<T, MarketFindUniqueArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Market that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketFindUniqueOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketFindFirstArgs>(args?: SelectSubset<T, MarketFindFirstArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Markets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Markets
     * const markets = await prisma.market.findMany()
     * 
     * // Get first 10 Markets
     * const markets = await prisma.market.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketWithIdOnly = await prisma.market.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketFindManyArgs>(args?: SelectSubset<T, MarketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Market.
     * @param {MarketCreateArgs} args - Arguments to create a Market.
     * @example
     * // Create one Market
     * const Market = await prisma.market.create({
     *   data: {
     *     // ... data to create a Market
     *   }
     * })
     * 
     */
    create<T extends MarketCreateArgs>(args: SelectSubset<T, MarketCreateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Markets.
     * @param {MarketCreateManyArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketCreateManyArgs>(args?: SelectSubset<T, MarketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Markets and returns the data saved in the database.
     * @param {MarketCreateManyAndReturnArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Market.
     * @param {MarketDeleteArgs} args - Arguments to delete one Market.
     * @example
     * // Delete one Market
     * const Market = await prisma.market.delete({
     *   where: {
     *     // ... filter to delete one Market
     *   }
     * })
     * 
     */
    delete<T extends MarketDeleteArgs>(args: SelectSubset<T, MarketDeleteArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Market.
     * @param {MarketUpdateArgs} args - Arguments to update one Market.
     * @example
     * // Update one Market
     * const market = await prisma.market.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketUpdateArgs>(args: SelectSubset<T, MarketUpdateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Markets.
     * @param {MarketDeleteManyArgs} args - Arguments to filter Markets to delete.
     * @example
     * // Delete a few Markets
     * const { count } = await prisma.market.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketDeleteManyArgs>(args?: SelectSubset<T, MarketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketUpdateManyArgs>(args: SelectSubset<T, MarketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets and returns the data updated in the database.
     * @param {MarketUpdateManyAndReturnArgs} args - Arguments to update many Markets.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Market.
     * @param {MarketUpsertArgs} args - Arguments to update or create a Market.
     * @example
     * // Update or create a Market
     * const market = await prisma.market.upsert({
     *   create: {
     *     // ... data to create a Market
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Market we want to update
     *   }
     * })
     */
    upsert<T extends MarketUpsertArgs>(args: SelectSubset<T, MarketUpsertArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketCountArgs} args - Arguments to filter Markets to count.
     * @example
     * // Count the number of Markets
     * const count = await prisma.market.count({
     *   where: {
     *     // ... the filter for the Markets we want to count
     *   }
     * })
    **/
    count<T extends MarketCountArgs>(
      args?: Subset<T, MarketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketAggregateArgs>(args: Subset<T, MarketAggregateArgs>): Prisma.PrismaPromise<GetMarketAggregateType<T>>

    /**
     * Group by Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketGroupByArgs['orderBy'] }
        : { orderBy?: MarketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Market model
   */
  readonly fields: MarketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Market.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Market model
   */
  interface MarketFieldRefs {
    readonly id: FieldRef<"Market", 'Int'>
    readonly name: FieldRef<"Market", 'String'>
    readonly marketId: FieldRef<"Market", 'Int'>
    readonly displayType: FieldRef<"Market", 'DisplayType'>
    readonly enabled: FieldRef<"Market", 'Boolean'>
    readonly superSubEligible: FieldRef<"Market", 'Boolean'>
    readonly createdAt: FieldRef<"Market", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Market findUnique
   */
  export type MarketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findUniqueOrThrow
   */
  export type MarketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findFirst
   */
  export type MarketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findFirstOrThrow
   */
  export type MarketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findMany
   */
  export type MarketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter, which Markets to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market create
   */
  export type MarketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data needed to create a Market.
     */
    data: XOR<MarketCreateInput, MarketUncheckedCreateInput>
  }

  /**
   * Market createMany
   */
  export type MarketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market createManyAndReturn
   */
  export type MarketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market update
   */
  export type MarketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data needed to update a Market.
     */
    data: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
    /**
     * Choose, which Market to update.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market updateMany
   */
  export type MarketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market updateManyAndReturn
   */
  export type MarketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market upsert
   */
  export type MarketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The filter to search for the Market to update in case it exists.
     */
    where: MarketWhereUniqueInput
    /**
     * In case the Market found by the `where` argument doesn't exist, create a new Market with this data.
     */
    create: XOR<MarketCreateInput, MarketUncheckedCreateInput>
    /**
     * In case the Market was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
  }

  /**
   * Market delete
   */
  export type MarketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Filter which Market to delete.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market deleteMany
   */
  export type MarketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Markets to delete
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to delete.
     */
    limit?: number
  }

  /**
   * Market without action
   */
  export type MarketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
  }


  /**
   * Model ExternalEvent
   */

  export type AggregateExternalEvent = {
    _count: ExternalEventCountAggregateOutputType | null
    _avg: ExternalEventAvgAggregateOutputType | null
    _sum: ExternalEventSumAggregateOutputType | null
    _min: ExternalEventMinAggregateOutputType | null
    _max: ExternalEventMaxAggregateOutputType | null
  }

  export type ExternalEventAvgAggregateOutputType = {
    id: number | null
  }

  export type ExternalEventSumAggregateOutputType = {
    id: number | null
  }

  export type ExternalEventMinAggregateOutputType = {
    id: number | null
    name: string | null
    externalEventId: string | null
    matchDate: Date | null
    createdAt: Date | null
  }

  export type ExternalEventMaxAggregateOutputType = {
    id: number | null
    name: string | null
    externalEventId: string | null
    matchDate: Date | null
    createdAt: Date | null
  }

  export type ExternalEventCountAggregateOutputType = {
    id: number
    name: number
    externalEventId: number
    matchDate: number
    createdAt: number
    _all: number
  }


  export type ExternalEventAvgAggregateInputType = {
    id?: true
  }

  export type ExternalEventSumAggregateInputType = {
    id?: true
  }

  export type ExternalEventMinAggregateInputType = {
    id?: true
    name?: true
    externalEventId?: true
    matchDate?: true
    createdAt?: true
  }

  export type ExternalEventMaxAggregateInputType = {
    id?: true
    name?: true
    externalEventId?: true
    matchDate?: true
    createdAt?: true
  }

  export type ExternalEventCountAggregateInputType = {
    id?: true
    name?: true
    externalEventId?: true
    matchDate?: true
    createdAt?: true
    _all?: true
  }

  export type ExternalEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalEvent to aggregate.
     */
    where?: ExternalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalEvents to fetch.
     */
    orderBy?: ExternalEventOrderByWithRelationInput | ExternalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExternalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExternalEvents
    **/
    _count?: true | ExternalEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExternalEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExternalEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExternalEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExternalEventMaxAggregateInputType
  }

  export type GetExternalEventAggregateType<T extends ExternalEventAggregateArgs> = {
        [P in keyof T & keyof AggregateExternalEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternalEvent[P]>
      : GetScalarType<T[P], AggregateExternalEvent[P]>
  }




  export type ExternalEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExternalEventWhereInput
    orderBy?: ExternalEventOrderByWithAggregationInput | ExternalEventOrderByWithAggregationInput[]
    by: ExternalEventScalarFieldEnum[] | ExternalEventScalarFieldEnum
    having?: ExternalEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExternalEventCountAggregateInputType | true
    _avg?: ExternalEventAvgAggregateInputType
    _sum?: ExternalEventSumAggregateInputType
    _min?: ExternalEventMinAggregateInputType
    _max?: ExternalEventMaxAggregateInputType
  }

  export type ExternalEventGroupByOutputType = {
    id: number
    name: string
    externalEventId: string
    matchDate: Date | null
    createdAt: Date
    _count: ExternalEventCountAggregateOutputType | null
    _avg: ExternalEventAvgAggregateOutputType | null
    _sum: ExternalEventSumAggregateOutputType | null
    _min: ExternalEventMinAggregateOutputType | null
    _max: ExternalEventMaxAggregateOutputType | null
  }

  type GetExternalEventGroupByPayload<T extends ExternalEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExternalEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExternalEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExternalEventGroupByOutputType[P]>
            : GetScalarType<T[P], ExternalEventGroupByOutputType[P]>
        }
      >
    >


  export type ExternalEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    externalEventId?: boolean
    matchDate?: boolean
    createdAt?: boolean
    games?: boolean | ExternalEvent$gamesArgs<ExtArgs>
    _count?: boolean | ExternalEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["externalEvent"]>

  export type ExternalEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    externalEventId?: boolean
    matchDate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["externalEvent"]>

  export type ExternalEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    externalEventId?: boolean
    matchDate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["externalEvent"]>

  export type ExternalEventSelectScalar = {
    id?: boolean
    name?: boolean
    externalEventId?: boolean
    matchDate?: boolean
    createdAt?: boolean
  }

  export type ExternalEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "externalEventId" | "matchDate" | "createdAt", ExtArgs["result"]["externalEvent"]>
  export type ExternalEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | ExternalEvent$gamesArgs<ExtArgs>
    _count?: boolean | ExternalEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExternalEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ExternalEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExternalEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExternalEvent"
    objects: {
      games: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      externalEventId: string
      matchDate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["externalEvent"]>
    composites: {}
  }

  type ExternalEventGetPayload<S extends boolean | null | undefined | ExternalEventDefaultArgs> = $Result.GetResult<Prisma.$ExternalEventPayload, S>

  type ExternalEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExternalEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExternalEventCountAggregateInputType | true
    }

  export interface ExternalEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExternalEvent'], meta: { name: 'ExternalEvent' } }
    /**
     * Find zero or one ExternalEvent that matches the filter.
     * @param {ExternalEventFindUniqueArgs} args - Arguments to find a ExternalEvent
     * @example
     * // Get one ExternalEvent
     * const externalEvent = await prisma.externalEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExternalEventFindUniqueArgs>(args: SelectSubset<T, ExternalEventFindUniqueArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExternalEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExternalEventFindUniqueOrThrowArgs} args - Arguments to find a ExternalEvent
     * @example
     * // Get one ExternalEvent
     * const externalEvent = await prisma.externalEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExternalEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ExternalEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventFindFirstArgs} args - Arguments to find a ExternalEvent
     * @example
     * // Get one ExternalEvent
     * const externalEvent = await prisma.externalEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExternalEventFindFirstArgs>(args?: SelectSubset<T, ExternalEventFindFirstArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventFindFirstOrThrowArgs} args - Arguments to find a ExternalEvent
     * @example
     * // Get one ExternalEvent
     * const externalEvent = await prisma.externalEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExternalEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ExternalEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExternalEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExternalEvents
     * const externalEvents = await prisma.externalEvent.findMany()
     * 
     * // Get first 10 ExternalEvents
     * const externalEvents = await prisma.externalEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const externalEventWithIdOnly = await prisma.externalEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExternalEventFindManyArgs>(args?: SelectSubset<T, ExternalEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExternalEvent.
     * @param {ExternalEventCreateArgs} args - Arguments to create a ExternalEvent.
     * @example
     * // Create one ExternalEvent
     * const ExternalEvent = await prisma.externalEvent.create({
     *   data: {
     *     // ... data to create a ExternalEvent
     *   }
     * })
     * 
     */
    create<T extends ExternalEventCreateArgs>(args: SelectSubset<T, ExternalEventCreateArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExternalEvents.
     * @param {ExternalEventCreateManyArgs} args - Arguments to create many ExternalEvents.
     * @example
     * // Create many ExternalEvents
     * const externalEvent = await prisma.externalEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExternalEventCreateManyArgs>(args?: SelectSubset<T, ExternalEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExternalEvents and returns the data saved in the database.
     * @param {ExternalEventCreateManyAndReturnArgs} args - Arguments to create many ExternalEvents.
     * @example
     * // Create many ExternalEvents
     * const externalEvent = await prisma.externalEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExternalEvents and only return the `id`
     * const externalEventWithIdOnly = await prisma.externalEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExternalEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ExternalEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExternalEvent.
     * @param {ExternalEventDeleteArgs} args - Arguments to delete one ExternalEvent.
     * @example
     * // Delete one ExternalEvent
     * const ExternalEvent = await prisma.externalEvent.delete({
     *   where: {
     *     // ... filter to delete one ExternalEvent
     *   }
     * })
     * 
     */
    delete<T extends ExternalEventDeleteArgs>(args: SelectSubset<T, ExternalEventDeleteArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExternalEvent.
     * @param {ExternalEventUpdateArgs} args - Arguments to update one ExternalEvent.
     * @example
     * // Update one ExternalEvent
     * const externalEvent = await prisma.externalEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExternalEventUpdateArgs>(args: SelectSubset<T, ExternalEventUpdateArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExternalEvents.
     * @param {ExternalEventDeleteManyArgs} args - Arguments to filter ExternalEvents to delete.
     * @example
     * // Delete a few ExternalEvents
     * const { count } = await prisma.externalEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExternalEventDeleteManyArgs>(args?: SelectSubset<T, ExternalEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExternalEvents
     * const externalEvent = await prisma.externalEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExternalEventUpdateManyArgs>(args: SelectSubset<T, ExternalEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalEvents and returns the data updated in the database.
     * @param {ExternalEventUpdateManyAndReturnArgs} args - Arguments to update many ExternalEvents.
     * @example
     * // Update many ExternalEvents
     * const externalEvent = await prisma.externalEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExternalEvents and only return the `id`
     * const externalEventWithIdOnly = await prisma.externalEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExternalEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ExternalEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExternalEvent.
     * @param {ExternalEventUpsertArgs} args - Arguments to update or create a ExternalEvent.
     * @example
     * // Update or create a ExternalEvent
     * const externalEvent = await prisma.externalEvent.upsert({
     *   create: {
     *     // ... data to create a ExternalEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExternalEvent we want to update
     *   }
     * })
     */
    upsert<T extends ExternalEventUpsertArgs>(args: SelectSubset<T, ExternalEventUpsertArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExternalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventCountArgs} args - Arguments to filter ExternalEvents to count.
     * @example
     * // Count the number of ExternalEvents
     * const count = await prisma.externalEvent.count({
     *   where: {
     *     // ... the filter for the ExternalEvents we want to count
     *   }
     * })
    **/
    count<T extends ExternalEventCountArgs>(
      args?: Subset<T, ExternalEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExternalEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExternalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExternalEventAggregateArgs>(args: Subset<T, ExternalEventAggregateArgs>): Prisma.PrismaPromise<GetExternalEventAggregateType<T>>

    /**
     * Group by ExternalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExternalEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExternalEventGroupByArgs['orderBy'] }
        : { orderBy?: ExternalEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExternalEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternalEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExternalEvent model
   */
  readonly fields: ExternalEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExternalEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExternalEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    games<T extends ExternalEvent$gamesArgs<ExtArgs> = {}>(args?: Subset<T, ExternalEvent$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExternalEvent model
   */
  interface ExternalEventFieldRefs {
    readonly id: FieldRef<"ExternalEvent", 'Int'>
    readonly name: FieldRef<"ExternalEvent", 'String'>
    readonly externalEventId: FieldRef<"ExternalEvent", 'String'>
    readonly matchDate: FieldRef<"ExternalEvent", 'DateTime'>
    readonly createdAt: FieldRef<"ExternalEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExternalEvent findUnique
   */
  export type ExternalEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter, which ExternalEvent to fetch.
     */
    where: ExternalEventWhereUniqueInput
  }

  /**
   * ExternalEvent findUniqueOrThrow
   */
  export type ExternalEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter, which ExternalEvent to fetch.
     */
    where: ExternalEventWhereUniqueInput
  }

  /**
   * ExternalEvent findFirst
   */
  export type ExternalEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter, which ExternalEvent to fetch.
     */
    where?: ExternalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalEvents to fetch.
     */
    orderBy?: ExternalEventOrderByWithRelationInput | ExternalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalEvents.
     */
    cursor?: ExternalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalEvents.
     */
    distinct?: ExternalEventScalarFieldEnum | ExternalEventScalarFieldEnum[]
  }

  /**
   * ExternalEvent findFirstOrThrow
   */
  export type ExternalEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter, which ExternalEvent to fetch.
     */
    where?: ExternalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalEvents to fetch.
     */
    orderBy?: ExternalEventOrderByWithRelationInput | ExternalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalEvents.
     */
    cursor?: ExternalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalEvents.
     */
    distinct?: ExternalEventScalarFieldEnum | ExternalEventScalarFieldEnum[]
  }

  /**
   * ExternalEvent findMany
   */
  export type ExternalEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter, which ExternalEvents to fetch.
     */
    where?: ExternalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalEvents to fetch.
     */
    orderBy?: ExternalEventOrderByWithRelationInput | ExternalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExternalEvents.
     */
    cursor?: ExternalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalEvents.
     */
    distinct?: ExternalEventScalarFieldEnum | ExternalEventScalarFieldEnum[]
  }

  /**
   * ExternalEvent create
   */
  export type ExternalEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * The data needed to create a ExternalEvent.
     */
    data: XOR<ExternalEventCreateInput, ExternalEventUncheckedCreateInput>
  }

  /**
   * ExternalEvent createMany
   */
  export type ExternalEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExternalEvents.
     */
    data: ExternalEventCreateManyInput | ExternalEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalEvent createManyAndReturn
   */
  export type ExternalEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * The data used to create many ExternalEvents.
     */
    data: ExternalEventCreateManyInput | ExternalEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalEvent update
   */
  export type ExternalEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * The data needed to update a ExternalEvent.
     */
    data: XOR<ExternalEventUpdateInput, ExternalEventUncheckedUpdateInput>
    /**
     * Choose, which ExternalEvent to update.
     */
    where: ExternalEventWhereUniqueInput
  }

  /**
   * ExternalEvent updateMany
   */
  export type ExternalEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExternalEvents.
     */
    data: XOR<ExternalEventUpdateManyMutationInput, ExternalEventUncheckedUpdateManyInput>
    /**
     * Filter which ExternalEvents to update
     */
    where?: ExternalEventWhereInput
    /**
     * Limit how many ExternalEvents to update.
     */
    limit?: number
  }

  /**
   * ExternalEvent updateManyAndReturn
   */
  export type ExternalEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * The data used to update ExternalEvents.
     */
    data: XOR<ExternalEventUpdateManyMutationInput, ExternalEventUncheckedUpdateManyInput>
    /**
     * Filter which ExternalEvents to update
     */
    where?: ExternalEventWhereInput
    /**
     * Limit how many ExternalEvents to update.
     */
    limit?: number
  }

  /**
   * ExternalEvent upsert
   */
  export type ExternalEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * The filter to search for the ExternalEvent to update in case it exists.
     */
    where: ExternalEventWhereUniqueInput
    /**
     * In case the ExternalEvent found by the `where` argument doesn't exist, create a new ExternalEvent with this data.
     */
    create: XOR<ExternalEventCreateInput, ExternalEventUncheckedCreateInput>
    /**
     * In case the ExternalEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExternalEventUpdateInput, ExternalEventUncheckedUpdateInput>
  }

  /**
   * ExternalEvent delete
   */
  export type ExternalEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
    /**
     * Filter which ExternalEvent to delete.
     */
    where: ExternalEventWhereUniqueInput
  }

  /**
   * ExternalEvent deleteMany
   */
  export type ExternalEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalEvents to delete
     */
    where?: ExternalEventWhereInput
    /**
     * Limit how many ExternalEvents to delete.
     */
    limit?: number
  }

  /**
   * ExternalEvent.games
   */
  export type ExternalEvent$gamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * ExternalEvent without action
   */
  export type ExternalEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalEvent
     */
    select?: ExternalEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalEvent
     */
    omit?: ExternalEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExternalEventInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
    multiplier: number | null
    sgaPrice: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    eventId: number | null
    multiplier: number | null
    sgaPrice: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    name: string | null
    eventId: number | null
    status: $Enums.GameStatus | null
    openTime: Date | null
    closeTime: Date | null
    prizeType: $Enums.PrizeType | null
    bonusId: string | null
    multiplier: number | null
    s3Status: string | null
    paymentStatus: string | null
    sgaUuid: string | null
    sgaPrice: number | null
    sgaStatus: string | null
    createdAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    name: string | null
    eventId: number | null
    status: $Enums.GameStatus | null
    openTime: Date | null
    closeTime: Date | null
    prizeType: $Enums.PrizeType | null
    bonusId: string | null
    multiplier: number | null
    s3Status: string | null
    paymentStatus: string | null
    sgaUuid: string | null
    sgaPrice: number | null
    sgaStatus: string | null
    createdAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    name: number
    eventId: number
    status: number
    openTime: number
    closeTime: number
    prizeType: number
    bonusId: number
    multiplier: number
    s3Status: number
    paymentStatus: number
    sgaUuid: number
    sgaPrice: number
    sgaStatus: number
    createdAt: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    eventId?: true
    multiplier?: true
    sgaPrice?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    eventId?: true
    multiplier?: true
    sgaPrice?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    status?: true
    openTime?: true
    closeTime?: true
    prizeType?: true
    bonusId?: true
    multiplier?: true
    s3Status?: true
    paymentStatus?: true
    sgaUuid?: true
    sgaPrice?: true
    sgaStatus?: true
    createdAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    status?: true
    openTime?: true
    closeTime?: true
    prizeType?: true
    bonusId?: true
    multiplier?: true
    s3Status?: true
    paymentStatus?: true
    sgaUuid?: true
    sgaPrice?: true
    sgaStatus?: true
    createdAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    name?: true
    eventId?: true
    status?: true
    openTime?: true
    closeTime?: true
    prizeType?: true
    bonusId?: true
    multiplier?: true
    s3Status?: true
    paymentStatus?: true
    sgaUuid?: true
    sgaPrice?: true
    sgaStatus?: true
    createdAt?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    name: string
    eventId: number
    status: $Enums.GameStatus
    openTime: Date
    closeTime: Date
    prizeType: $Enums.PrizeType
    bonusId: string | null
    multiplier: number
    s3Status: string | null
    paymentStatus: string | null
    sgaUuid: string | null
    sgaPrice: number | null
    sgaStatus: string | null
    createdAt: Date
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    status?: boolean
    openTime?: boolean
    closeTime?: boolean
    prizeType?: boolean
    bonusId?: boolean
    multiplier?: boolean
    s3Status?: boolean
    paymentStatus?: boolean
    sgaUuid?: boolean
    sgaPrice?: boolean
    sgaStatus?: boolean
    createdAt?: boolean
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
    picks?: boolean | Game$picksArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    status?: boolean
    openTime?: boolean
    closeTime?: boolean
    prizeType?: boolean
    bonusId?: boolean
    multiplier?: boolean
    s3Status?: boolean
    paymentStatus?: boolean
    sgaUuid?: boolean
    sgaPrice?: boolean
    sgaStatus?: boolean
    createdAt?: boolean
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    eventId?: boolean
    status?: boolean
    openTime?: boolean
    closeTime?: boolean
    prizeType?: boolean
    bonusId?: boolean
    multiplier?: boolean
    s3Status?: boolean
    paymentStatus?: boolean
    sgaUuid?: boolean
    sgaPrice?: boolean
    sgaStatus?: boolean
    createdAt?: boolean
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    name?: boolean
    eventId?: boolean
    status?: boolean
    openTime?: boolean
    closeTime?: boolean
    prizeType?: boolean
    bonusId?: boolean
    multiplier?: boolean
    s3Status?: boolean
    paymentStatus?: boolean
    sgaUuid?: boolean
    sgaPrice?: boolean
    sgaStatus?: boolean
    createdAt?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "eventId" | "status" | "openTime" | "closeTime" | "prizeType" | "bonusId" | "multiplier" | "s3Status" | "paymentStatus" | "sgaUuid" | "sgaPrice" | "sgaStatus" | "createdAt", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
    picks?: boolean | Game$picksArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | ExternalEventDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      event: Prisma.$ExternalEventPayload<ExtArgs>
      picks: Prisma.$PickPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      eventId: number
      status: $Enums.GameStatus
      openTime: Date
      closeTime: Date
      prizeType: $Enums.PrizeType
      bonusId: string | null
      multiplier: number
      s3Status: string | null
      paymentStatus: string | null
      sgaUuid: string | null
      sgaPrice: number | null
      sgaStatus: string | null
      createdAt: Date
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends ExternalEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExternalEventDefaultArgs<ExtArgs>>): Prisma__ExternalEventClient<$Result.GetResult<Prisma.$ExternalEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    picks<T extends Game$picksArgs<ExtArgs> = {}>(args?: Subset<T, Game$picksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly name: FieldRef<"Game", 'String'>
    readonly eventId: FieldRef<"Game", 'Int'>
    readonly status: FieldRef<"Game", 'GameStatus'>
    readonly openTime: FieldRef<"Game", 'DateTime'>
    readonly closeTime: FieldRef<"Game", 'DateTime'>
    readonly prizeType: FieldRef<"Game", 'PrizeType'>
    readonly bonusId: FieldRef<"Game", 'String'>
    readonly multiplier: FieldRef<"Game", 'Float'>
    readonly s3Status: FieldRef<"Game", 'String'>
    readonly paymentStatus: FieldRef<"Game", 'String'>
    readonly sgaUuid: FieldRef<"Game", 'String'>
    readonly sgaPrice: FieldRef<"Game", 'Float'>
    readonly sgaStatus: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.picks
   */
  export type Game$picksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    where?: PickWhereInput
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    cursor?: PickWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PickScalarFieldEnum | PickScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    id: number | null
  }

  export type PlayerSumAggregateOutputType = {
    id: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: number | null
    slug: string | null
    displayName: string | null
    createdAt: Date | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    displayName: string | null
    createdAt: Date | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    slug: number
    displayName: number
    createdAt: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    id?: true
  }

  export type PlayerSumAggregateInputType = {
    id?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    slug?: true
    displayName?: true
    createdAt?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    slug?: true
    displayName?: true
    createdAt?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    slug?: true
    displayName?: true
    createdAt?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: number
    slug: string
    displayName: string
    createdAt: Date
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    displayName?: boolean
    createdAt?: boolean
    picks?: boolean | Player$picksArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    displayName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    displayName?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    slug?: boolean
    displayName?: boolean
    createdAt?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "displayName" | "createdAt", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    picks?: boolean | Player$picksArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      picks: Prisma.$PickPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      displayName: string
      createdAt: Date
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    picks<T extends Player$picksArgs<ExtArgs> = {}>(args?: Subset<T, Player$picksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'Int'>
    readonly slug: FieldRef<"Player", 'String'>
    readonly displayName: FieldRef<"Player", 'String'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.picks
   */
  export type Player$picksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    where?: PickWhereInput
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    cursor?: PickWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PickScalarFieldEnum | PickScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Pick
   */

  export type AggregatePick = {
    _count: PickCountAggregateOutputType | null
    _avg: PickAvgAggregateOutputType | null
    _sum: PickSumAggregateOutputType | null
    _min: PickMinAggregateOutputType | null
    _max: PickMaxAggregateOutputType | null
  }

  export type PickAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    playerId: number | null
    marketId: number | null
    oddPrice: number | null
  }

  export type PickSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    playerId: number | null
    marketId: number | null
    oddPrice: number | null
  }

  export type PickMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    playerId: number | null
    marketId: number | null
    oddUuid: string | null
    oddName: string | null
    marketName: string | null
    oddPrice: number | null
    createdAt: Date | null
  }

  export type PickMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    playerId: number | null
    marketId: number | null
    oddUuid: string | null
    oddName: string | null
    marketName: string | null
    oddPrice: number | null
    createdAt: Date | null
  }

  export type PickCountAggregateOutputType = {
    id: number
    gameId: number
    playerId: number
    marketId: number
    oddUuid: number
    oddName: number
    marketName: number
    oddPrice: number
    createdAt: number
    _all: number
  }


  export type PickAvgAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    marketId?: true
    oddPrice?: true
  }

  export type PickSumAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    marketId?: true
    oddPrice?: true
  }

  export type PickMinAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    marketId?: true
    oddUuid?: true
    oddName?: true
    marketName?: true
    oddPrice?: true
    createdAt?: true
  }

  export type PickMaxAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    marketId?: true
    oddUuid?: true
    oddName?: true
    marketName?: true
    oddPrice?: true
    createdAt?: true
  }

  export type PickCountAggregateInputType = {
    id?: true
    gameId?: true
    playerId?: true
    marketId?: true
    oddUuid?: true
    oddName?: true
    marketName?: true
    oddPrice?: true
    createdAt?: true
    _all?: true
  }

  export type PickAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pick to aggregate.
     */
    where?: PickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Picks to fetch.
     */
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Picks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Picks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Picks
    **/
    _count?: true | PickCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PickAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PickSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PickMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PickMaxAggregateInputType
  }

  export type GetPickAggregateType<T extends PickAggregateArgs> = {
        [P in keyof T & keyof AggregatePick]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePick[P]>
      : GetScalarType<T[P], AggregatePick[P]>
  }




  export type PickGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PickWhereInput
    orderBy?: PickOrderByWithAggregationInput | PickOrderByWithAggregationInput[]
    by: PickScalarFieldEnum[] | PickScalarFieldEnum
    having?: PickScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PickCountAggregateInputType | true
    _avg?: PickAvgAggregateInputType
    _sum?: PickSumAggregateInputType
    _min?: PickMinAggregateInputType
    _max?: PickMaxAggregateInputType
  }

  export type PickGroupByOutputType = {
    id: number
    gameId: number
    playerId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt: Date
    _count: PickCountAggregateOutputType | null
    _avg: PickAvgAggregateOutputType | null
    _sum: PickSumAggregateOutputType | null
    _min: PickMinAggregateOutputType | null
    _max: PickMaxAggregateOutputType | null
  }

  type GetPickGroupByPayload<T extends PickGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PickGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PickGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PickGroupByOutputType[P]>
            : GetScalarType<T[P], PickGroupByOutputType[P]>
        }
      >
    >


  export type PickSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    marketId?: boolean
    oddUuid?: boolean
    oddName?: boolean
    marketName?: boolean
    oddPrice?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pick"]>

  export type PickSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    marketId?: boolean
    oddUuid?: boolean
    oddName?: boolean
    marketName?: boolean
    oddPrice?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pick"]>

  export type PickSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    marketId?: boolean
    oddUuid?: boolean
    oddName?: boolean
    marketName?: boolean
    oddPrice?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pick"]>

  export type PickSelectScalar = {
    id?: boolean
    gameId?: boolean
    playerId?: boolean
    marketId?: boolean
    oddUuid?: boolean
    oddName?: boolean
    marketName?: boolean
    oddPrice?: boolean
    createdAt?: boolean
  }

  export type PickOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "playerId" | "marketId" | "oddUuid" | "oddName" | "marketName" | "oddPrice" | "createdAt", ExtArgs["result"]["pick"]>
  export type PickInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PickIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PickIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $PickPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pick"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      gameId: number
      playerId: number
      marketId: number
      oddUuid: string
      oddName: string
      marketName: string
      oddPrice: number
      createdAt: Date
    }, ExtArgs["result"]["pick"]>
    composites: {}
  }

  type PickGetPayload<S extends boolean | null | undefined | PickDefaultArgs> = $Result.GetResult<Prisma.$PickPayload, S>

  type PickCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PickFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PickCountAggregateInputType | true
    }

  export interface PickDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pick'], meta: { name: 'Pick' } }
    /**
     * Find zero or one Pick that matches the filter.
     * @param {PickFindUniqueArgs} args - Arguments to find a Pick
     * @example
     * // Get one Pick
     * const pick = await prisma.pick.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PickFindUniqueArgs>(args: SelectSubset<T, PickFindUniqueArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pick that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PickFindUniqueOrThrowArgs} args - Arguments to find a Pick
     * @example
     * // Get one Pick
     * const pick = await prisma.pick.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PickFindUniqueOrThrowArgs>(args: SelectSubset<T, PickFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pick that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickFindFirstArgs} args - Arguments to find a Pick
     * @example
     * // Get one Pick
     * const pick = await prisma.pick.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PickFindFirstArgs>(args?: SelectSubset<T, PickFindFirstArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pick that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickFindFirstOrThrowArgs} args - Arguments to find a Pick
     * @example
     * // Get one Pick
     * const pick = await prisma.pick.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PickFindFirstOrThrowArgs>(args?: SelectSubset<T, PickFindFirstOrThrowArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Picks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Picks
     * const picks = await prisma.pick.findMany()
     * 
     * // Get first 10 Picks
     * const picks = await prisma.pick.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pickWithIdOnly = await prisma.pick.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PickFindManyArgs>(args?: SelectSubset<T, PickFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pick.
     * @param {PickCreateArgs} args - Arguments to create a Pick.
     * @example
     * // Create one Pick
     * const Pick = await prisma.pick.create({
     *   data: {
     *     // ... data to create a Pick
     *   }
     * })
     * 
     */
    create<T extends PickCreateArgs>(args: SelectSubset<T, PickCreateArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Picks.
     * @param {PickCreateManyArgs} args - Arguments to create many Picks.
     * @example
     * // Create many Picks
     * const pick = await prisma.pick.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PickCreateManyArgs>(args?: SelectSubset<T, PickCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Picks and returns the data saved in the database.
     * @param {PickCreateManyAndReturnArgs} args - Arguments to create many Picks.
     * @example
     * // Create many Picks
     * const pick = await prisma.pick.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Picks and only return the `id`
     * const pickWithIdOnly = await prisma.pick.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PickCreateManyAndReturnArgs>(args?: SelectSubset<T, PickCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pick.
     * @param {PickDeleteArgs} args - Arguments to delete one Pick.
     * @example
     * // Delete one Pick
     * const Pick = await prisma.pick.delete({
     *   where: {
     *     // ... filter to delete one Pick
     *   }
     * })
     * 
     */
    delete<T extends PickDeleteArgs>(args: SelectSubset<T, PickDeleteArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pick.
     * @param {PickUpdateArgs} args - Arguments to update one Pick.
     * @example
     * // Update one Pick
     * const pick = await prisma.pick.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PickUpdateArgs>(args: SelectSubset<T, PickUpdateArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Picks.
     * @param {PickDeleteManyArgs} args - Arguments to filter Picks to delete.
     * @example
     * // Delete a few Picks
     * const { count } = await prisma.pick.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PickDeleteManyArgs>(args?: SelectSubset<T, PickDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Picks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Picks
     * const pick = await prisma.pick.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PickUpdateManyArgs>(args: SelectSubset<T, PickUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Picks and returns the data updated in the database.
     * @param {PickUpdateManyAndReturnArgs} args - Arguments to update many Picks.
     * @example
     * // Update many Picks
     * const pick = await prisma.pick.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Picks and only return the `id`
     * const pickWithIdOnly = await prisma.pick.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PickUpdateManyAndReturnArgs>(args: SelectSubset<T, PickUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pick.
     * @param {PickUpsertArgs} args - Arguments to update or create a Pick.
     * @example
     * // Update or create a Pick
     * const pick = await prisma.pick.upsert({
     *   create: {
     *     // ... data to create a Pick
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pick we want to update
     *   }
     * })
     */
    upsert<T extends PickUpsertArgs>(args: SelectSubset<T, PickUpsertArgs<ExtArgs>>): Prisma__PickClient<$Result.GetResult<Prisma.$PickPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Picks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickCountArgs} args - Arguments to filter Picks to count.
     * @example
     * // Count the number of Picks
     * const count = await prisma.pick.count({
     *   where: {
     *     // ... the filter for the Picks we want to count
     *   }
     * })
    **/
    count<T extends PickCountArgs>(
      args?: Subset<T, PickCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PickCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pick.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PickAggregateArgs>(args: Subset<T, PickAggregateArgs>): Prisma.PrismaPromise<GetPickAggregateType<T>>

    /**
     * Group by Pick.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PickGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PickGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PickGroupByArgs['orderBy'] }
        : { orderBy?: PickGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PickGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPickGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pick model
   */
  readonly fields: PickFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pick.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PickClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pick model
   */
  interface PickFieldRefs {
    readonly id: FieldRef<"Pick", 'Int'>
    readonly gameId: FieldRef<"Pick", 'Int'>
    readonly playerId: FieldRef<"Pick", 'Int'>
    readonly marketId: FieldRef<"Pick", 'Int'>
    readonly oddUuid: FieldRef<"Pick", 'String'>
    readonly oddName: FieldRef<"Pick", 'String'>
    readonly marketName: FieldRef<"Pick", 'String'>
    readonly oddPrice: FieldRef<"Pick", 'Float'>
    readonly createdAt: FieldRef<"Pick", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pick findUnique
   */
  export type PickFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter, which Pick to fetch.
     */
    where: PickWhereUniqueInput
  }

  /**
   * Pick findUniqueOrThrow
   */
  export type PickFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter, which Pick to fetch.
     */
    where: PickWhereUniqueInput
  }

  /**
   * Pick findFirst
   */
  export type PickFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter, which Pick to fetch.
     */
    where?: PickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Picks to fetch.
     */
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Picks.
     */
    cursor?: PickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Picks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Picks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Picks.
     */
    distinct?: PickScalarFieldEnum | PickScalarFieldEnum[]
  }

  /**
   * Pick findFirstOrThrow
   */
  export type PickFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter, which Pick to fetch.
     */
    where?: PickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Picks to fetch.
     */
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Picks.
     */
    cursor?: PickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Picks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Picks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Picks.
     */
    distinct?: PickScalarFieldEnum | PickScalarFieldEnum[]
  }

  /**
   * Pick findMany
   */
  export type PickFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter, which Picks to fetch.
     */
    where?: PickWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Picks to fetch.
     */
    orderBy?: PickOrderByWithRelationInput | PickOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Picks.
     */
    cursor?: PickWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Picks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Picks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Picks.
     */
    distinct?: PickScalarFieldEnum | PickScalarFieldEnum[]
  }

  /**
   * Pick create
   */
  export type PickCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * The data needed to create a Pick.
     */
    data: XOR<PickCreateInput, PickUncheckedCreateInput>
  }

  /**
   * Pick createMany
   */
  export type PickCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Picks.
     */
    data: PickCreateManyInput | PickCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pick createManyAndReturn
   */
  export type PickCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * The data used to create many Picks.
     */
    data: PickCreateManyInput | PickCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pick update
   */
  export type PickUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * The data needed to update a Pick.
     */
    data: XOR<PickUpdateInput, PickUncheckedUpdateInput>
    /**
     * Choose, which Pick to update.
     */
    where: PickWhereUniqueInput
  }

  /**
   * Pick updateMany
   */
  export type PickUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Picks.
     */
    data: XOR<PickUpdateManyMutationInput, PickUncheckedUpdateManyInput>
    /**
     * Filter which Picks to update
     */
    where?: PickWhereInput
    /**
     * Limit how many Picks to update.
     */
    limit?: number
  }

  /**
   * Pick updateManyAndReturn
   */
  export type PickUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * The data used to update Picks.
     */
    data: XOR<PickUpdateManyMutationInput, PickUncheckedUpdateManyInput>
    /**
     * Filter which Picks to update
     */
    where?: PickWhereInput
    /**
     * Limit how many Picks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pick upsert
   */
  export type PickUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * The filter to search for the Pick to update in case it exists.
     */
    where: PickWhereUniqueInput
    /**
     * In case the Pick found by the `where` argument doesn't exist, create a new Pick with this data.
     */
    create: XOR<PickCreateInput, PickUncheckedCreateInput>
    /**
     * In case the Pick was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PickUpdateInput, PickUncheckedUpdateInput>
  }

  /**
   * Pick delete
   */
  export type PickDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
    /**
     * Filter which Pick to delete.
     */
    where: PickWhereUniqueInput
  }

  /**
   * Pick deleteMany
   */
  export type PickDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Picks to delete
     */
    where?: PickWhereInput
    /**
     * Limit how many Picks to delete.
     */
    limit?: number
  }

  /**
   * Pick without action
   */
  export type PickDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pick
     */
    select?: PickSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pick
     */
    omit?: PickOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PickInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MarketScalarFieldEnum: {
    id: 'id',
    name: 'name',
    marketId: 'marketId',
    displayType: 'displayType',
    enabled: 'enabled',
    superSubEligible: 'superSubEligible',
    createdAt: 'createdAt'
  };

  export type MarketScalarFieldEnum = (typeof MarketScalarFieldEnum)[keyof typeof MarketScalarFieldEnum]


  export const ExternalEventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    externalEventId: 'externalEventId',
    matchDate: 'matchDate',
    createdAt: 'createdAt'
  };

  export type ExternalEventScalarFieldEnum = (typeof ExternalEventScalarFieldEnum)[keyof typeof ExternalEventScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    name: 'name',
    eventId: 'eventId',
    status: 'status',
    openTime: 'openTime',
    closeTime: 'closeTime',
    prizeType: 'prizeType',
    bonusId: 'bonusId',
    multiplier: 'multiplier',
    s3Status: 's3Status',
    paymentStatus: 'paymentStatus',
    sgaUuid: 'sgaUuid',
    sgaPrice: 'sgaPrice',
    sgaStatus: 'sgaStatus',
    createdAt: 'createdAt'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    displayName: 'displayName',
    createdAt: 'createdAt'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const PickScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    playerId: 'playerId',
    marketId: 'marketId',
    oddUuid: 'oddUuid',
    oddName: 'oddName',
    marketName: 'marketName',
    oddPrice: 'oddPrice',
    createdAt: 'createdAt'
  };

  export type PickScalarFieldEnum = (typeof PickScalarFieldEnum)[keyof typeof PickScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DisplayType'
   */
  export type EnumDisplayTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisplayType'>
    


  /**
   * Reference to a field of type 'DisplayType[]'
   */
  export type ListEnumDisplayTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisplayType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'GameStatus'
   */
  export type EnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus'>
    


  /**
   * Reference to a field of type 'GameStatus[]'
   */
  export type ListEnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus[]'>
    


  /**
   * Reference to a field of type 'PrizeType'
   */
  export type EnumPrizeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrizeType'>
    


  /**
   * Reference to a field of type 'PrizeType[]'
   */
  export type ListEnumPrizeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrizeType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MarketWhereInput = {
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    id?: IntFilter<"Market"> | number
    name?: StringFilter<"Market"> | string
    marketId?: IntFilter<"Market"> | number
    displayType?: EnumDisplayTypeFilter<"Market"> | $Enums.DisplayType
    enabled?: BoolFilter<"Market"> | boolean
    superSubEligible?: BoolFilter<"Market"> | boolean
    createdAt?: DateTimeFilter<"Market"> | Date | string
  }

  export type MarketOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    marketId?: SortOrder
    displayType?: SortOrder
    enabled?: SortOrder
    superSubEligible?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    marketId?: number
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    name?: StringFilter<"Market"> | string
    displayType?: EnumDisplayTypeFilter<"Market"> | $Enums.DisplayType
    enabled?: BoolFilter<"Market"> | boolean
    superSubEligible?: BoolFilter<"Market"> | boolean
    createdAt?: DateTimeFilter<"Market"> | Date | string
  }, "id" | "marketId">

  export type MarketOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    marketId?: SortOrder
    displayType?: SortOrder
    enabled?: SortOrder
    superSubEligible?: SortOrder
    createdAt?: SortOrder
    _count?: MarketCountOrderByAggregateInput
    _avg?: MarketAvgOrderByAggregateInput
    _max?: MarketMaxOrderByAggregateInput
    _min?: MarketMinOrderByAggregateInput
    _sum?: MarketSumOrderByAggregateInput
  }

  export type MarketScalarWhereWithAggregatesInput = {
    AND?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    OR?: MarketScalarWhereWithAggregatesInput[]
    NOT?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Market"> | number
    name?: StringWithAggregatesFilter<"Market"> | string
    marketId?: IntWithAggregatesFilter<"Market"> | number
    displayType?: EnumDisplayTypeWithAggregatesFilter<"Market"> | $Enums.DisplayType
    enabled?: BoolWithAggregatesFilter<"Market"> | boolean
    superSubEligible?: BoolWithAggregatesFilter<"Market"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
  }

  export type ExternalEventWhereInput = {
    AND?: ExternalEventWhereInput | ExternalEventWhereInput[]
    OR?: ExternalEventWhereInput[]
    NOT?: ExternalEventWhereInput | ExternalEventWhereInput[]
    id?: IntFilter<"ExternalEvent"> | number
    name?: StringFilter<"ExternalEvent"> | string
    externalEventId?: StringFilter<"ExternalEvent"> | string
    matchDate?: DateTimeNullableFilter<"ExternalEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"ExternalEvent"> | Date | string
    games?: GameListRelationFilter
  }

  export type ExternalEventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    externalEventId?: SortOrder
    matchDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    games?: GameOrderByRelationAggregateInput
  }

  export type ExternalEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    externalEventId?: string
    AND?: ExternalEventWhereInput | ExternalEventWhereInput[]
    OR?: ExternalEventWhereInput[]
    NOT?: ExternalEventWhereInput | ExternalEventWhereInput[]
    name?: StringFilter<"ExternalEvent"> | string
    matchDate?: DateTimeNullableFilter<"ExternalEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"ExternalEvent"> | Date | string
    games?: GameListRelationFilter
  }, "id" | "externalEventId">

  export type ExternalEventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    externalEventId?: SortOrder
    matchDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ExternalEventCountOrderByAggregateInput
    _avg?: ExternalEventAvgOrderByAggregateInput
    _max?: ExternalEventMaxOrderByAggregateInput
    _min?: ExternalEventMinOrderByAggregateInput
    _sum?: ExternalEventSumOrderByAggregateInput
  }

  export type ExternalEventScalarWhereWithAggregatesInput = {
    AND?: ExternalEventScalarWhereWithAggregatesInput | ExternalEventScalarWhereWithAggregatesInput[]
    OR?: ExternalEventScalarWhereWithAggregatesInput[]
    NOT?: ExternalEventScalarWhereWithAggregatesInput | ExternalEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExternalEvent"> | number
    name?: StringWithAggregatesFilter<"ExternalEvent"> | string
    externalEventId?: StringWithAggregatesFilter<"ExternalEvent"> | string
    matchDate?: DateTimeNullableWithAggregatesFilter<"ExternalEvent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExternalEvent"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    name?: StringFilter<"Game"> | string
    eventId?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    openTime?: DateTimeFilter<"Game"> | Date | string
    closeTime?: DateTimeFilter<"Game"> | Date | string
    prizeType?: EnumPrizeTypeFilter<"Game"> | $Enums.PrizeType
    bonusId?: StringNullableFilter<"Game"> | string | null
    multiplier?: FloatFilter<"Game"> | number
    s3Status?: StringNullableFilter<"Game"> | string | null
    paymentStatus?: StringNullableFilter<"Game"> | string | null
    sgaUuid?: StringNullableFilter<"Game"> | string | null
    sgaPrice?: FloatNullableFilter<"Game"> | number | null
    sgaStatus?: StringNullableFilter<"Game"> | string | null
    createdAt?: DateTimeFilter<"Game"> | Date | string
    event?: XOR<ExternalEventScalarRelationFilter, ExternalEventWhereInput>
    picks?: PickListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    prizeType?: SortOrder
    bonusId?: SortOrderInput | SortOrder
    multiplier?: SortOrder
    s3Status?: SortOrderInput | SortOrder
    paymentStatus?: SortOrderInput | SortOrder
    sgaUuid?: SortOrderInput | SortOrder
    sgaPrice?: SortOrderInput | SortOrder
    sgaStatus?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    event?: ExternalEventOrderByWithRelationInput
    picks?: PickOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    name?: StringFilter<"Game"> | string
    eventId?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    openTime?: DateTimeFilter<"Game"> | Date | string
    closeTime?: DateTimeFilter<"Game"> | Date | string
    prizeType?: EnumPrizeTypeFilter<"Game"> | $Enums.PrizeType
    bonusId?: StringNullableFilter<"Game"> | string | null
    multiplier?: FloatFilter<"Game"> | number
    s3Status?: StringNullableFilter<"Game"> | string | null
    paymentStatus?: StringNullableFilter<"Game"> | string | null
    sgaUuid?: StringNullableFilter<"Game"> | string | null
    sgaPrice?: FloatNullableFilter<"Game"> | number | null
    sgaStatus?: StringNullableFilter<"Game"> | string | null
    createdAt?: DateTimeFilter<"Game"> | Date | string
    event?: XOR<ExternalEventScalarRelationFilter, ExternalEventWhereInput>
    picks?: PickListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    prizeType?: SortOrder
    bonusId?: SortOrderInput | SortOrder
    multiplier?: SortOrder
    s3Status?: SortOrderInput | SortOrder
    paymentStatus?: SortOrderInput | SortOrder
    sgaUuid?: SortOrderInput | SortOrder
    sgaPrice?: SortOrderInput | SortOrder
    sgaStatus?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    name?: StringWithAggregatesFilter<"Game"> | string
    eventId?: IntWithAggregatesFilter<"Game"> | number
    status?: EnumGameStatusWithAggregatesFilter<"Game"> | $Enums.GameStatus
    openTime?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    closeTime?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    prizeType?: EnumPrizeTypeWithAggregatesFilter<"Game"> | $Enums.PrizeType
    bonusId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    multiplier?: FloatWithAggregatesFilter<"Game"> | number
    s3Status?: StringNullableWithAggregatesFilter<"Game"> | string | null
    paymentStatus?: StringNullableWithAggregatesFilter<"Game"> | string | null
    sgaUuid?: StringNullableWithAggregatesFilter<"Game"> | string | null
    sgaPrice?: FloatNullableWithAggregatesFilter<"Game"> | number | null
    sgaStatus?: StringNullableWithAggregatesFilter<"Game"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: IntFilter<"Player"> | number
    slug?: StringFilter<"Player"> | string
    displayName?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    picks?: PickListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    picks?: PickOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    displayName?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    picks?: PickListRelationFilter
  }, "id" | "slug">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Player"> | number
    slug?: StringWithAggregatesFilter<"Player"> | string
    displayName?: StringWithAggregatesFilter<"Player"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
  }

  export type PickWhereInput = {
    AND?: PickWhereInput | PickWhereInput[]
    OR?: PickWhereInput[]
    NOT?: PickWhereInput | PickWhereInput[]
    id?: IntFilter<"Pick"> | number
    gameId?: IntFilter<"Pick"> | number
    playerId?: IntFilter<"Pick"> | number
    marketId?: IntFilter<"Pick"> | number
    oddUuid?: StringFilter<"Pick"> | string
    oddName?: StringFilter<"Pick"> | string
    marketName?: StringFilter<"Pick"> | string
    oddPrice?: FloatFilter<"Pick"> | number
    createdAt?: DateTimeFilter<"Pick"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }

  export type PickOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddUuid?: SortOrder
    oddName?: SortOrder
    marketName?: SortOrder
    oddPrice?: SortOrder
    createdAt?: SortOrder
    game?: GameOrderByWithRelationInput
    player?: PlayerOrderByWithRelationInput
  }

  export type PickWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameId_playerId?: PickGameIdPlayerIdCompoundUniqueInput
    AND?: PickWhereInput | PickWhereInput[]
    OR?: PickWhereInput[]
    NOT?: PickWhereInput | PickWhereInput[]
    gameId?: IntFilter<"Pick"> | number
    playerId?: IntFilter<"Pick"> | number
    marketId?: IntFilter<"Pick"> | number
    oddUuid?: StringFilter<"Pick"> | string
    oddName?: StringFilter<"Pick"> | string
    marketName?: StringFilter<"Pick"> | string
    oddPrice?: FloatFilter<"Pick"> | number
    createdAt?: DateTimeFilter<"Pick"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }, "id" | "gameId_playerId">

  export type PickOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddUuid?: SortOrder
    oddName?: SortOrder
    marketName?: SortOrder
    oddPrice?: SortOrder
    createdAt?: SortOrder
    _count?: PickCountOrderByAggregateInput
    _avg?: PickAvgOrderByAggregateInput
    _max?: PickMaxOrderByAggregateInput
    _min?: PickMinOrderByAggregateInput
    _sum?: PickSumOrderByAggregateInput
  }

  export type PickScalarWhereWithAggregatesInput = {
    AND?: PickScalarWhereWithAggregatesInput | PickScalarWhereWithAggregatesInput[]
    OR?: PickScalarWhereWithAggregatesInput[]
    NOT?: PickScalarWhereWithAggregatesInput | PickScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pick"> | number
    gameId?: IntWithAggregatesFilter<"Pick"> | number
    playerId?: IntWithAggregatesFilter<"Pick"> | number
    marketId?: IntWithAggregatesFilter<"Pick"> | number
    oddUuid?: StringWithAggregatesFilter<"Pick"> | string
    oddName?: StringWithAggregatesFilter<"Pick"> | string
    marketName?: StringWithAggregatesFilter<"Pick"> | string
    oddPrice?: FloatWithAggregatesFilter<"Pick"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Pick"> | Date | string
  }

  export type MarketCreateInput = {
    name: string
    marketId: number
    displayType: $Enums.DisplayType
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: Date | string
  }

  export type MarketUncheckedCreateInput = {
    id?: number
    name: string
    marketId: number
    displayType: $Enums.DisplayType
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: Date | string
  }

  export type MarketUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    marketId?: IntFieldUpdateOperationsInput | number
    displayType?: EnumDisplayTypeFieldUpdateOperationsInput | $Enums.DisplayType
    enabled?: BoolFieldUpdateOperationsInput | boolean
    superSubEligible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    marketId?: IntFieldUpdateOperationsInput | number
    displayType?: EnumDisplayTypeFieldUpdateOperationsInput | $Enums.DisplayType
    enabled?: BoolFieldUpdateOperationsInput | boolean
    superSubEligible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketCreateManyInput = {
    id?: number
    name: string
    marketId: number
    displayType: $Enums.DisplayType
    enabled?: boolean
    superSubEligible?: boolean
    createdAt?: Date | string
  }

  export type MarketUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    marketId?: IntFieldUpdateOperationsInput | number
    displayType?: EnumDisplayTypeFieldUpdateOperationsInput | $Enums.DisplayType
    enabled?: BoolFieldUpdateOperationsInput | boolean
    superSubEligible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    marketId?: IntFieldUpdateOperationsInput | number
    displayType?: EnumDisplayTypeFieldUpdateOperationsInput | $Enums.DisplayType
    enabled?: BoolFieldUpdateOperationsInput | boolean
    superSubEligible?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalEventCreateInput = {
    name: string
    externalEventId: string
    matchDate?: Date | string | null
    createdAt?: Date | string
    games?: GameCreateNestedManyWithoutEventInput
  }

  export type ExternalEventUncheckedCreateInput = {
    id?: number
    name: string
    externalEventId: string
    matchDate?: Date | string | null
    createdAt?: Date | string
    games?: GameUncheckedCreateNestedManyWithoutEventInput
  }

  export type ExternalEventUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUpdateManyWithoutEventNestedInput
  }

  export type ExternalEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUncheckedUpdateManyWithoutEventNestedInput
  }

  export type ExternalEventCreateManyInput = {
    id?: number
    name: string
    externalEventId: string
    matchDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ExternalEventUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    name: string
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
    event: ExternalEventCreateNestedOneWithoutGamesInput
    picks?: PickCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    name: string
    eventId: number
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
    picks?: PickUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: ExternalEventUpdateOneRequiredWithoutGamesNestedInput
    picks?: PickUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: PickUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    name: string
    eventId: number
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
  }

  export type GameUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateInput = {
    slug: string
    displayName: string
    createdAt?: Date | string
    picks?: PickCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: number
    slug: string
    displayName: string
    createdAt?: Date | string
    picks?: PickUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: PickUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: PickUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: number
    slug: string
    displayName: string
    createdAt?: Date | string
  }

  export type PlayerUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickCreateInput = {
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutPicksInput
    player: PlayerCreateNestedOneWithoutPicksInput
  }

  export type PickUncheckedCreateInput = {
    id?: number
    gameId: number
    playerId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickUpdateInput = {
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutPicksNestedInput
    player?: PlayerUpdateOneRequiredWithoutPicksNestedInput
  }

  export type PickUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickCreateManyInput = {
    id?: number
    gameId: number
    playerId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickUpdateManyMutationInput = {
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumDisplayTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DisplayType | EnumDisplayTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDisplayTypeFilter<$PrismaModel> | $Enums.DisplayType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MarketCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marketId?: SortOrder
    displayType?: SortOrder
    enabled?: SortOrder
    superSubEligible?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketAvgOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
  }

  export type MarketMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marketId?: SortOrder
    displayType?: SortOrder
    enabled?: SortOrder
    superSubEligible?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marketId?: SortOrder
    displayType?: SortOrder
    enabled?: SortOrder
    superSubEligible?: SortOrder
    createdAt?: SortOrder
  }

  export type MarketSumOrderByAggregateInput = {
    id?: SortOrder
    marketId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumDisplayTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisplayType | EnumDisplayTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDisplayTypeWithAggregatesFilter<$PrismaModel> | $Enums.DisplayType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisplayTypeFilter<$PrismaModel>
    _max?: NestedEnumDisplayTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExternalEventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    externalEventId?: SortOrder
    matchDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ExternalEventAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExternalEventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    externalEventId?: SortOrder
    matchDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ExternalEventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    externalEventId?: SortOrder
    matchDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ExternalEventSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type EnumPrizeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PrizeType | EnumPrizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPrizeTypeFilter<$PrismaModel> | $Enums.PrizeType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ExternalEventScalarRelationFilter = {
    is?: ExternalEventWhereInput
    isNot?: ExternalEventWhereInput
  }

  export type PickListRelationFilter = {
    every?: PickWhereInput
    some?: PickWhereInput
    none?: PickWhereInput
  }

  export type PickOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    prizeType?: SortOrder
    bonusId?: SortOrder
    multiplier?: SortOrder
    s3Status?: SortOrder
    paymentStatus?: SortOrder
    sgaUuid?: SortOrder
    sgaPrice?: SortOrder
    sgaStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    multiplier?: SortOrder
    sgaPrice?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    prizeType?: SortOrder
    bonusId?: SortOrder
    multiplier?: SortOrder
    s3Status?: SortOrder
    paymentStatus?: SortOrder
    sgaUuid?: SortOrder
    sgaPrice?: SortOrder
    sgaStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    eventId?: SortOrder
    status?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    prizeType?: SortOrder
    bonusId?: SortOrder
    multiplier?: SortOrder
    s3Status?: SortOrder
    paymentStatus?: SortOrder
    sgaUuid?: SortOrder
    sgaPrice?: SortOrder
    sgaStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    multiplier?: SortOrder
    sgaPrice?: SortOrder
  }

  export type EnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type EnumPrizeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrizeType | EnumPrizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPrizeTypeWithAggregatesFilter<$PrismaModel> | $Enums.PrizeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrizeTypeFilter<$PrismaModel>
    _max?: NestedEnumPrizeTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type PickGameIdPlayerIdCompoundUniqueInput = {
    gameId: number
    playerId: number
  }

  export type PickCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddUuid?: SortOrder
    oddName?: SortOrder
    marketName?: SortOrder
    oddPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PickAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddPrice?: SortOrder
  }

  export type PickMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddUuid?: SortOrder
    oddName?: SortOrder
    marketName?: SortOrder
    oddPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PickMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddUuid?: SortOrder
    oddName?: SortOrder
    marketName?: SortOrder
    oddPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PickSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    marketId?: SortOrder
    oddPrice?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumDisplayTypeFieldUpdateOperationsInput = {
    set?: $Enums.DisplayType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameCreateNestedManyWithoutEventInput = {
    create?: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput> | GameCreateWithoutEventInput[] | GameUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GameCreateOrConnectWithoutEventInput | GameCreateOrConnectWithoutEventInput[]
    createMany?: GameCreateManyEventInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput> | GameCreateWithoutEventInput[] | GameUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GameCreateOrConnectWithoutEventInput | GameCreateOrConnectWithoutEventInput[]
    createMany?: GameCreateManyEventInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GameUpdateManyWithoutEventNestedInput = {
    create?: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput> | GameCreateWithoutEventInput[] | GameUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GameCreateOrConnectWithoutEventInput | GameCreateOrConnectWithoutEventInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutEventInput | GameUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GameCreateManyEventInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutEventInput | GameUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GameUpdateManyWithWhereWithoutEventInput | GameUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput> | GameCreateWithoutEventInput[] | GameUncheckedCreateWithoutEventInput[]
    connectOrCreate?: GameCreateOrConnectWithoutEventInput | GameCreateOrConnectWithoutEventInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutEventInput | GameUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: GameCreateManyEventInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutEventInput | GameUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: GameUpdateManyWithWhereWithoutEventInput | GameUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type ExternalEventCreateNestedOneWithoutGamesInput = {
    create?: XOR<ExternalEventCreateWithoutGamesInput, ExternalEventUncheckedCreateWithoutGamesInput>
    connectOrCreate?: ExternalEventCreateOrConnectWithoutGamesInput
    connect?: ExternalEventWhereUniqueInput
  }

  export type PickCreateNestedManyWithoutGameInput = {
    create?: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput> | PickCreateWithoutGameInput[] | PickUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PickCreateOrConnectWithoutGameInput | PickCreateOrConnectWithoutGameInput[]
    createMany?: PickCreateManyGameInputEnvelope
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
  }

  export type PickUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput> | PickCreateWithoutGameInput[] | PickUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PickCreateOrConnectWithoutGameInput | PickCreateOrConnectWithoutGameInput[]
    createMany?: PickCreateManyGameInputEnvelope
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
  }

  export type EnumGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.GameStatus
  }

  export type EnumPrizeTypeFieldUpdateOperationsInput = {
    set?: $Enums.PrizeType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExternalEventUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<ExternalEventCreateWithoutGamesInput, ExternalEventUncheckedCreateWithoutGamesInput>
    connectOrCreate?: ExternalEventCreateOrConnectWithoutGamesInput
    upsert?: ExternalEventUpsertWithoutGamesInput
    connect?: ExternalEventWhereUniqueInput
    update?: XOR<XOR<ExternalEventUpdateToOneWithWhereWithoutGamesInput, ExternalEventUpdateWithoutGamesInput>, ExternalEventUncheckedUpdateWithoutGamesInput>
  }

  export type PickUpdateManyWithoutGameNestedInput = {
    create?: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput> | PickCreateWithoutGameInput[] | PickUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PickCreateOrConnectWithoutGameInput | PickCreateOrConnectWithoutGameInput[]
    upsert?: PickUpsertWithWhereUniqueWithoutGameInput | PickUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PickCreateManyGameInputEnvelope
    set?: PickWhereUniqueInput | PickWhereUniqueInput[]
    disconnect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    delete?: PickWhereUniqueInput | PickWhereUniqueInput[]
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    update?: PickUpdateWithWhereUniqueWithoutGameInput | PickUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PickUpdateManyWithWhereWithoutGameInput | PickUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PickScalarWhereInput | PickScalarWhereInput[]
  }

  export type PickUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput> | PickCreateWithoutGameInput[] | PickUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PickCreateOrConnectWithoutGameInput | PickCreateOrConnectWithoutGameInput[]
    upsert?: PickUpsertWithWhereUniqueWithoutGameInput | PickUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PickCreateManyGameInputEnvelope
    set?: PickWhereUniqueInput | PickWhereUniqueInput[]
    disconnect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    delete?: PickWhereUniqueInput | PickWhereUniqueInput[]
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    update?: PickUpdateWithWhereUniqueWithoutGameInput | PickUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PickUpdateManyWithWhereWithoutGameInput | PickUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PickScalarWhereInput | PickScalarWhereInput[]
  }

  export type PickCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput> | PickCreateWithoutPlayerInput[] | PickUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PickCreateOrConnectWithoutPlayerInput | PickCreateOrConnectWithoutPlayerInput[]
    createMany?: PickCreateManyPlayerInputEnvelope
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
  }

  export type PickUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput> | PickCreateWithoutPlayerInput[] | PickUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PickCreateOrConnectWithoutPlayerInput | PickCreateOrConnectWithoutPlayerInput[]
    createMany?: PickCreateManyPlayerInputEnvelope
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
  }

  export type PickUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput> | PickCreateWithoutPlayerInput[] | PickUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PickCreateOrConnectWithoutPlayerInput | PickCreateOrConnectWithoutPlayerInput[]
    upsert?: PickUpsertWithWhereUniqueWithoutPlayerInput | PickUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PickCreateManyPlayerInputEnvelope
    set?: PickWhereUniqueInput | PickWhereUniqueInput[]
    disconnect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    delete?: PickWhereUniqueInput | PickWhereUniqueInput[]
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    update?: PickUpdateWithWhereUniqueWithoutPlayerInput | PickUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PickUpdateManyWithWhereWithoutPlayerInput | PickUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PickScalarWhereInput | PickScalarWhereInput[]
  }

  export type PickUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput> | PickCreateWithoutPlayerInput[] | PickUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PickCreateOrConnectWithoutPlayerInput | PickCreateOrConnectWithoutPlayerInput[]
    upsert?: PickUpsertWithWhereUniqueWithoutPlayerInput | PickUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PickCreateManyPlayerInputEnvelope
    set?: PickWhereUniqueInput | PickWhereUniqueInput[]
    disconnect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    delete?: PickWhereUniqueInput | PickWhereUniqueInput[]
    connect?: PickWhereUniqueInput | PickWhereUniqueInput[]
    update?: PickUpdateWithWhereUniqueWithoutPlayerInput | PickUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PickUpdateManyWithWhereWithoutPlayerInput | PickUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PickScalarWhereInput | PickScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutPicksInput = {
    create?: XOR<GameCreateWithoutPicksInput, GameUncheckedCreateWithoutPicksInput>
    connectOrCreate?: GameCreateOrConnectWithoutPicksInput
    connect?: GameWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutPicksInput = {
    create?: XOR<PlayerCreateWithoutPicksInput, PlayerUncheckedCreateWithoutPicksInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutPicksInput
    connect?: PlayerWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutPicksNestedInput = {
    create?: XOR<GameCreateWithoutPicksInput, GameUncheckedCreateWithoutPicksInput>
    connectOrCreate?: GameCreateOrConnectWithoutPicksInput
    upsert?: GameUpsertWithoutPicksInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPicksInput, GameUpdateWithoutPicksInput>, GameUncheckedUpdateWithoutPicksInput>
  }

  export type PlayerUpdateOneRequiredWithoutPicksNestedInput = {
    create?: XOR<PlayerCreateWithoutPicksInput, PlayerUncheckedCreateWithoutPicksInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutPicksInput
    upsert?: PlayerUpsertWithoutPicksInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutPicksInput, PlayerUpdateWithoutPicksInput>, PlayerUncheckedUpdateWithoutPicksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumDisplayTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DisplayType | EnumDisplayTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDisplayTypeFilter<$PrismaModel> | $Enums.DisplayType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumDisplayTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisplayType | EnumDisplayTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisplayType[] | ListEnumDisplayTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDisplayTypeWithAggregatesFilter<$PrismaModel> | $Enums.DisplayType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisplayTypeFilter<$PrismaModel>
    _max?: NestedEnumDisplayTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type NestedEnumPrizeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PrizeType | EnumPrizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPrizeTypeFilter<$PrismaModel> | $Enums.PrizeType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type NestedEnumPrizeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrizeType | EnumPrizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrizeType[] | ListEnumPrizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPrizeTypeWithAggregatesFilter<$PrismaModel> | $Enums.PrizeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrizeTypeFilter<$PrismaModel>
    _max?: NestedEnumPrizeTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type GameCreateWithoutEventInput = {
    name: string
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
    picks?: PickCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutEventInput = {
    id?: number
    name: string
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
    picks?: PickUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutEventInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput>
  }

  export type GameCreateManyEventInputEnvelope = {
    data: GameCreateManyEventInput | GameCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type GameUpsertWithWhereUniqueWithoutEventInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutEventInput, GameUncheckedUpdateWithoutEventInput>
    create: XOR<GameCreateWithoutEventInput, GameUncheckedCreateWithoutEventInput>
  }

  export type GameUpdateWithWhereUniqueWithoutEventInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutEventInput, GameUncheckedUpdateWithoutEventInput>
  }

  export type GameUpdateManyWithWhereWithoutEventInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutEventInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: IntFilter<"Game"> | number
    name?: StringFilter<"Game"> | string
    eventId?: IntFilter<"Game"> | number
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    openTime?: DateTimeFilter<"Game"> | Date | string
    closeTime?: DateTimeFilter<"Game"> | Date | string
    prizeType?: EnumPrizeTypeFilter<"Game"> | $Enums.PrizeType
    bonusId?: StringNullableFilter<"Game"> | string | null
    multiplier?: FloatFilter<"Game"> | number
    s3Status?: StringNullableFilter<"Game"> | string | null
    paymentStatus?: StringNullableFilter<"Game"> | string | null
    sgaUuid?: StringNullableFilter<"Game"> | string | null
    sgaPrice?: FloatNullableFilter<"Game"> | number | null
    sgaStatus?: StringNullableFilter<"Game"> | string | null
    createdAt?: DateTimeFilter<"Game"> | Date | string
  }

  export type ExternalEventCreateWithoutGamesInput = {
    name: string
    externalEventId: string
    matchDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ExternalEventUncheckedCreateWithoutGamesInput = {
    id?: number
    name: string
    externalEventId: string
    matchDate?: Date | string | null
    createdAt?: Date | string
  }

  export type ExternalEventCreateOrConnectWithoutGamesInput = {
    where: ExternalEventWhereUniqueInput
    create: XOR<ExternalEventCreateWithoutGamesInput, ExternalEventUncheckedCreateWithoutGamesInput>
  }

  export type PickCreateWithoutGameInput = {
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
    player: PlayerCreateNestedOneWithoutPicksInput
  }

  export type PickUncheckedCreateWithoutGameInput = {
    id?: number
    playerId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickCreateOrConnectWithoutGameInput = {
    where: PickWhereUniqueInput
    create: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput>
  }

  export type PickCreateManyGameInputEnvelope = {
    data: PickCreateManyGameInput | PickCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type ExternalEventUpsertWithoutGamesInput = {
    update: XOR<ExternalEventUpdateWithoutGamesInput, ExternalEventUncheckedUpdateWithoutGamesInput>
    create: XOR<ExternalEventCreateWithoutGamesInput, ExternalEventUncheckedCreateWithoutGamesInput>
    where?: ExternalEventWhereInput
  }

  export type ExternalEventUpdateToOneWithWhereWithoutGamesInput = {
    where?: ExternalEventWhereInput
    data: XOR<ExternalEventUpdateWithoutGamesInput, ExternalEventUncheckedUpdateWithoutGamesInput>
  }

  export type ExternalEventUpdateWithoutGamesInput = {
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalEventUncheckedUpdateWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    externalEventId?: StringFieldUpdateOperationsInput | string
    matchDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickUpsertWithWhereUniqueWithoutGameInput = {
    where: PickWhereUniqueInput
    update: XOR<PickUpdateWithoutGameInput, PickUncheckedUpdateWithoutGameInput>
    create: XOR<PickCreateWithoutGameInput, PickUncheckedCreateWithoutGameInput>
  }

  export type PickUpdateWithWhereUniqueWithoutGameInput = {
    where: PickWhereUniqueInput
    data: XOR<PickUpdateWithoutGameInput, PickUncheckedUpdateWithoutGameInput>
  }

  export type PickUpdateManyWithWhereWithoutGameInput = {
    where: PickScalarWhereInput
    data: XOR<PickUpdateManyMutationInput, PickUncheckedUpdateManyWithoutGameInput>
  }

  export type PickScalarWhereInput = {
    AND?: PickScalarWhereInput | PickScalarWhereInput[]
    OR?: PickScalarWhereInput[]
    NOT?: PickScalarWhereInput | PickScalarWhereInput[]
    id?: IntFilter<"Pick"> | number
    gameId?: IntFilter<"Pick"> | number
    playerId?: IntFilter<"Pick"> | number
    marketId?: IntFilter<"Pick"> | number
    oddUuid?: StringFilter<"Pick"> | string
    oddName?: StringFilter<"Pick"> | string
    marketName?: StringFilter<"Pick"> | string
    oddPrice?: FloatFilter<"Pick"> | number
    createdAt?: DateTimeFilter<"Pick"> | Date | string
  }

  export type PickCreateWithoutPlayerInput = {
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutPicksInput
  }

  export type PickUncheckedCreateWithoutPlayerInput = {
    id?: number
    gameId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickCreateOrConnectWithoutPlayerInput = {
    where: PickWhereUniqueInput
    create: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput>
  }

  export type PickCreateManyPlayerInputEnvelope = {
    data: PickCreateManyPlayerInput | PickCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type PickUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PickWhereUniqueInput
    update: XOR<PickUpdateWithoutPlayerInput, PickUncheckedUpdateWithoutPlayerInput>
    create: XOR<PickCreateWithoutPlayerInput, PickUncheckedCreateWithoutPlayerInput>
  }

  export type PickUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PickWhereUniqueInput
    data: XOR<PickUpdateWithoutPlayerInput, PickUncheckedUpdateWithoutPlayerInput>
  }

  export type PickUpdateManyWithWhereWithoutPlayerInput = {
    where: PickScalarWhereInput
    data: XOR<PickUpdateManyMutationInput, PickUncheckedUpdateManyWithoutPlayerInput>
  }

  export type GameCreateWithoutPicksInput = {
    name: string
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
    event: ExternalEventCreateNestedOneWithoutGamesInput
  }

  export type GameUncheckedCreateWithoutPicksInput = {
    id?: number
    name: string
    eventId: number
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
  }

  export type GameCreateOrConnectWithoutPicksInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPicksInput, GameUncheckedCreateWithoutPicksInput>
  }

  export type PlayerCreateWithoutPicksInput = {
    slug: string
    displayName: string
    createdAt?: Date | string
  }

  export type PlayerUncheckedCreateWithoutPicksInput = {
    id?: number
    slug: string
    displayName: string
    createdAt?: Date | string
  }

  export type PlayerCreateOrConnectWithoutPicksInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutPicksInput, PlayerUncheckedCreateWithoutPicksInput>
  }

  export type GameUpsertWithoutPicksInput = {
    update: XOR<GameUpdateWithoutPicksInput, GameUncheckedUpdateWithoutPicksInput>
    create: XOR<GameCreateWithoutPicksInput, GameUncheckedCreateWithoutPicksInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPicksInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPicksInput, GameUncheckedUpdateWithoutPicksInput>
  }

  export type GameUpdateWithoutPicksInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: ExternalEventUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutPicksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    eventId?: IntFieldUpdateOperationsInput | number
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUpsertWithoutPicksInput = {
    update: XOR<PlayerUpdateWithoutPicksInput, PlayerUncheckedUpdateWithoutPicksInput>
    create: XOR<PlayerCreateWithoutPicksInput, PlayerUncheckedCreateWithoutPicksInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutPicksInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutPicksInput, PlayerUncheckedUpdateWithoutPicksInput>
  }

  export type PlayerUpdateWithoutPicksInput = {
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateWithoutPicksInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateManyEventInput = {
    id?: number
    name: string
    status?: $Enums.GameStatus
    openTime: Date | string
    closeTime: Date | string
    prizeType: $Enums.PrizeType
    bonusId?: string | null
    multiplier?: number
    s3Status?: string | null
    paymentStatus?: string | null
    sgaUuid?: string | null
    sgaPrice?: number | null
    sgaStatus?: string | null
    createdAt?: Date | string
  }

  export type GameUpdateWithoutEventInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: PickUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    picks?: PickUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    closeTime?: DateTimeFieldUpdateOperationsInput | Date | string
    prizeType?: EnumPrizeTypeFieldUpdateOperationsInput | $Enums.PrizeType
    bonusId?: NullableStringFieldUpdateOperationsInput | string | null
    multiplier?: FloatFieldUpdateOperationsInput | number
    s3Status?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    sgaUuid?: NullableStringFieldUpdateOperationsInput | string | null
    sgaPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    sgaStatus?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickCreateManyGameInput = {
    id?: number
    playerId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickUpdateWithoutGameInput = {
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutPicksNestedInput
  }

  export type PickUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickCreateManyPlayerInput = {
    id?: number
    gameId: number
    marketId: number
    oddUuid: string
    oddName: string
    marketName: string
    oddPrice: number
    createdAt?: Date | string
  }

  export type PickUpdateWithoutPlayerInput = {
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutPicksNestedInput
  }

  export type PickUncheckedUpdateWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PickUncheckedUpdateManyWithoutPlayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    marketId?: IntFieldUpdateOperationsInput | number
    oddUuid?: StringFieldUpdateOperationsInput | string
    oddName?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    oddPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}