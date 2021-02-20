import moment from "moment";

export const isoToDisplay = (isoDate: string) => moment(isoDate).format('MMM DD, YYYY');

export const formatDollarAmount = (amount: number) => '$' + amount.toFixed(2);