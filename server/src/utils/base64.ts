export function encode(data: string) {
  return Buffer.from(data).toString('base64')
}

export function decode(data: string) {
  return Buffer.from(data, 'base64').toString('utf8')
}