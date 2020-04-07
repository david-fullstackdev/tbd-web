import { getDateRange } from './utility';

test('getDateRange', () => {
  const start = '2017-12-01T00:00:00.000Z';
  const end = '2017-12-31T00:00:00.000Z';
  const startDate = new Date(start);
  const endDate = new Date(end);
  const range = getDateRange(startDate, endDate);
  const first = new Date(range[0]);
  const mid = new Date(range[14]);
  const last = new Date(range[range.length - 1]);

  expect(range.length).toEqual(31);
  expect(first.toISOString()).toEqual(start);
  expect(mid.toISOString()).toEqual('2017-12-15T00:00:00.000Z');
  expect(last.toISOString()).toEqual(end);
});