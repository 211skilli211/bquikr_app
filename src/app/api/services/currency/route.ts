import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Caribbean and major world currencies with exchange rates (base: USD)
const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1.0,
  'JMD': 155.0,
  'TTD': 6.78,
  'BBD': 2.0,
  'XCD': 2.70,
  'KYD': 0.83,
  'AWG': 1.79,
  'ANG': 1.79,
  'BSD': 1.0,
  'BZD': 2.0,
  'HTG': 132.0,
  'DOP': 56.0,
  'CUP': 24.0,
  'SRD': 38.0,
  'GYD': 209.0,
  'EUR': 0.92,
  'GBP': 0.79,
  'CAD': 1.36,
  'AUD': 1.53,
  'JPY': 149.50,
  'CNY': 7.24,
  'INR': 83.12,
  'MXN': 17.15,
  'BRL': 4.97,
  'BTC': 0.000015,
  'ETH': 0.00035,
};

const CURRENCY_INFO: Record<string, { name: string; symbol: string; flag: string }> = {
  'USD': { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  'JMD': { name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
  'TTD': { name: 'Trinidad Dollar', symbol: 'TT$', flag: '🇹🇹' },
  'BBD': { name: 'Barbados Dollar', symbol: 'Bds$', flag: '🇧🇧' },
  'XCD': { name: 'East Caribbean Dollar', symbol: 'EC$', flag: '🌴' },
  'EUR': { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  'GBP': { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  'CAD': { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from')?.toUpperCase();
  const to = searchParams.get('to')?.toUpperCase();
  const amount = parseFloat(searchParams.get('amount') || '1');

  if (!from && !to) {
    const currencies = Object.keys(EXCHANGE_RATES).map(code => ({
      code,
      ...CURRENCY_INFO[code],
      rateToUSD: EXCHANGE_RATES[code],
    }));
    return NextResponse.json({ success: true, base: 'USD', currencies });
  }

  if (from && to) {
    const fromRate = EXCHANGE_RATES[from];
    const toRate = EXCHANGE_RATES[to];
    if (!fromRate || !toRate) {
      return NextResponse.json({ error: 'Invalid currency code' }, { status: 400 });
    }
    const convertedAmount = (amount / fromRate) * toRate;
    return NextResponse.json({
      success: true,
      from: { code: from, amount },
      to: { code: to, amount: parseFloat(convertedAmount.toFixed(2)) },
      exchangeRate: parseFloat((toRate / fromRate).toFixed(6)),
    });
  }

  return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
}