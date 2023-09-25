import { describe, expect, it } from 'vitest';
import { formatRelativeDate } from './formatRelativeDate';

describe('formatRelativeDate', () => {
  it('returns correct relative date when zero is passed', () => {
    expect(formatRelativeDate(0)).toEqual('today')
  })

  it('returns correct relative date when negative number is passed', () => {
    expect(formatRelativeDate(-1)).toEqual('1 day ago')
  })

  it('returns correct relative date when positive number is passed', () => {
    expect(formatRelativeDate(5)).toEqual('in 5 days')
  })
})
