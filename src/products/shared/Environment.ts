export default class Environment {
  public static readonly getDomain = (): string => {
    const HOST = process.env["HOST"] ?? 'localhost'
    const PORT = process.env["PORT"] ?? 1802
    const PROTOCOL = process.env["PROTOCOL"] ?? 'http'
    return `${PROTOCOL}://${HOST}:${PORT}`
  }
}