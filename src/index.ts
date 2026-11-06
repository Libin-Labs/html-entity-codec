const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
export function encodeEntities(input: string): string {
  if (typeof input !== 'string') throw new TypeError('Expected text');
  return input.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]!,
  );
}
export function decodeEntities(input: string): string {
  if (typeof input !== 'string') throw new TypeError('Expected text');
  return input.replace(/&(?:([a-z]+)|#(\d+)|#x([\da-f]+));/gi, (_whole, name, decimal, hex) => {
    if (name) {
      const value = named[name.toLowerCase()];
      if (value === undefined) throw new RangeError('Unsupported named entity');
      return value;
    }
    const point = Number(decimal ?? '0x' + hex);
    if (
      !Number.isInteger(point) ||
      point < 0 ||
      point > 0x10ffff ||
      (point >= 0xd800 && point <= 0xdfff)
    )
      throw new RangeError('Invalid Unicode scalar reference');
    return String.fromCodePoint(point);
  });
}
