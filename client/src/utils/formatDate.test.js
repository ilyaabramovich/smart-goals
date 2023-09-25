import { describe, expect, it } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('returns date in correct format', () => {
    expect(formatDate('2023-09-25T18:47:03.257Z')).toEqual('2023-09-25')
  })
})
