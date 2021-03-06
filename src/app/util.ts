import moment from "moment";

export function isoToDisplay(isoDate: string): string {
  return moment(isoDate).format('MMM DD, YYYY');
} 

export function formatDollarAmount(amount: number) {
  return '$' + amount.toFixed(2);
}

export function toFixedNoNegativeZero(num: number, precision: number) {
  const toFixedResult = num.toFixed(precision);
  return toFixedResult == '-0.' + '0'.repeat(precision) ? toFixedResult.replace('-', '') : toFixedResult;
}

export function mapPercentToRedGreenGradient(pct: number) {
  const percentColors = [
    { pct: -1.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } 
  ];

  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  
  const lower = percentColors[i - 1];
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}  