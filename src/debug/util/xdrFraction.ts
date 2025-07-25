// This content is copied from js-stellar-base (src/util/continued_fraction.js)
import BigNumber from "bignumber.js";

const MAX_INT = ((1 << 31) >>> 0) - 1;

export function best_r(rawNumber: string | number | BigNumber) {
  let number = new BigNumber(rawNumber);
  let a;
  let f;
  const fractions = [
    [new BigNumber(0), new BigNumber(1)],
    [new BigNumber(1), new BigNumber(0)],
  ];
  let i = 2;

  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }
    a = number.integerValue(BigNumber.ROUND_FLOOR);
    f = number.minus(a);
    const h = a.times(fractions[i - 1][0]).plus(fractions[i - 2][0]);
    const k = a.times(fractions[i - 1][1]).plus(fractions[i - 2][1]);
    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }
    fractions.push([h, k]);
    if (f.eq(0)) {
      break;
    }
    number = new BigNumber(1).div(f);
    i += 1;
  }
  const [n, d] = fractions[fractions.length - 1];

  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }

  return [n.toNumber(), d.toNumber()];
}
