/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */
/**
 * @typedef Options
 *   Configuration (optional).
 * @property {number | string | boolean | null | undefined} [pretty=0]
 *   Value of `space` of `JSON.stringify(x, undefined, space)`.
 * @property {boolean | null | undefined} [quiet=false]
 *   Do not show files without messages.
 * @property {boolean | null | undefined} [silent=false]
 *   Show errors only.
 *
 *   This does not show info and warning messages.
 *   Also sets `quiet` to `true`.
 *
 * @typedef JsonMessage
 *   JSON message.
 *
 *   > **Note**: `file` is not exposed.
 * @property {string | null} stack
 *   Stack of message.
 *
 *   This is used by normal errors to show where something happened in
 *   programming code.
 * @property {string} reason
 *   Reason for message.
 *
 *   > 👉 **Note**: you should use markdown.
 * @property {boolean | null | undefined} [fatal]
 *   State of problem.
 *
 *   * `true` — marks associated file as no longer processable (error)
 *   * `false` — necessitates a (potential) change (warning)
 *   * `null | undefined` — for things that might not need changing (info)
 * @property {number | null} line
 *   Starting line of error.
 * @property {number | null} column
 *   Starting column of error.
 * @property {VFileMessage['position']} position
 *   Full unist position.
 * @property {string | null} source
 *   Namespace of message (example: `'my-package'`).
 * @property {string | null} ruleId
 *   Category of message (example: `'my-rule'`).
 * @property {string | null | undefined} actual
 *   Specify the source value that’s being reported, which is deemed
 *   incorrect.
 * @property {Array<string> | null | undefined} expected
 *   Suggest acceptable values that can be used instead of `actual`.
 * @property {string | null | undefined} url
 *   Link to docs for the message.
 *
 *   > 👉 **Note**: this must be an absolute URL that can be passed as `x`
 *   > to `new URL(x)`.
 * @property {string | null | undefined} note
 *   Long form description of the message (should use markdown).
 *
 * @typedef JsonFile
 *   JSON file.
 * @property {string} path
 *   Full path (example: `'~/index.min.js'`).
 * @property {string} cwd
 *   Base of `path`.
 * @property {Array<string>} history
 *   List of filepaths the file moved between.
 *
 *   The first is the original path and the last is the current path.
 * @property {Array<JsonMessage>} messages
 *   JSON messages.
 */
/**
 * Create a **serialized** JSON report from one file or multiple files.
 *
 * @param {Array<VFile> | VFile} files
 *   File or files to report.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Report as serialized JSON.
 */
export function reporterJson(
  files: Array<VFile> | VFile,
  options?: Options | null | undefined
): string
export type VFile = import('vfile').VFile
export type VFileMessage = import('vfile-message').VFileMessage
/**
 * Configuration (optional).
 */
export type Options = {
  /**
   * Value of `space` of `JSON.stringify(x, undefined, space)`.
   */
  pretty?: number | string | boolean | null | undefined
  /**
   * Do not show files without messages.
   */
  quiet?: boolean | null | undefined
  /**
   * Show errors only.
   *
   * This does not show info and warning messages.
   * Also sets `quiet` to `true`.
   */
  silent?: boolean | null | undefined
}
/**
 * JSON message.
 *
 * > **Note**: `file` is not exposed.
 */
export type JsonMessage = {
  /**
   *   Stack of message.
   *
   *   This is used by normal errors to show where something happened in
   *   programming code.
   */
  stack: string | null
  /**
   *   Reason for message.
   *
   *   > 👉 **Note**: you should use markdown.
   */
  reason: string
  /**
   * State of problem.
   *
   * * `true` — marks associated file as no longer processable (error)
   * * `false` — necessitates a (potential) change (warning)
   * * `null | undefined` — for things that might not need changing (info)
   */
  fatal?: boolean | null | undefined
  /**
   *   Starting line of error.
   */
  line: number | null
  /**
   *   Starting column of error.
   */
  column: number | null
  /**
   *   Full unist position.
   */
  position: VFileMessage['position']
  /**
   *   Namespace of message (example: `'my-package'`).
   */
  source: string | null
  /**
   *   Category of message (example: `'my-rule'`).
   */
  ruleId: string | null
  /**
   *   Specify the source value that’s being reported, which is deemed
   *   incorrect.
   */
  actual: string | null | undefined
  /**
   *   Suggest acceptable values that can be used instead of `actual`.
   */
  expected: Array<string> | null | undefined
  /**
   *   Link to docs for the message.
   *
   *   > 👉 **Note**: this must be an absolute URL that can be passed as `x`
   *   > to `new URL(x)`.
   */
  url: string | null | undefined
  /**
   *   Long form description of the message (should use markdown).
   */
  note: string | null | undefined
}
/**
 * JSON file.
 */
export type JsonFile = {
  /**
   *   Full path (example: `'~/index.min.js'`).
   */
  path: string
  /**
   *   Base of `path`.
   */
  cwd: string
  /**
   *   List of filepaths the file moved between.
   *
   *   The first is the original path and the last is the current path.
   */
  history: Array<string>
  /**
   *   JSON messages.
   */
  messages: Array<JsonMessage>
}
