export default class Environment {
  public static readonly getDomain = (): string => {
    const HOST = process.env["HOST"] ?? 'http://internal-LB-Privadas-222101674.us-east-1.elb.amazonaws.com'
    const PORT = process.env["PORT"] ?? 1802
    const PROTOCOL = process.env["PROTOCOL"] ?? 'http'
    return `${PROTOCOL}://${HOST}:${PORT}`
  }
}