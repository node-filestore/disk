/// <reference types="node" />

import { Readable } from 'stream'

declare interface Options {
  path: string
  prefix?: string
}

declare interface PutOptions {
  mode?: number
}

declare type Input = Readable | Buffer | string | Iterable<Buffer | string>

declare class FileStoreDisk {
  constructor (options: Options)
  put (id: string, data: Input, options?: PutOptions): Promise<void>
  get (id: string): Readable
  has (id: string): Promise<boolean>
}

export = FileStoreDisk
