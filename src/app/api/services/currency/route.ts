import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Caribbean and major world currencies with exchange rates (base: USD)
// Rates are approximate and should be updated from a real API in production
const EXCHANGE_RATES: Record<string, number> = {
  // Caribbean Currencies
  'USD': 1.0,
  'JMD': 155.0,        // Jamaican Dollar
  'TTD': 6.78,         // Trinidad & Tobago Dollar
  'BBD': 2.0,          // Barbados Dollar
  'XCD': 2.70,         // East Caribbean Dollar (EC$)
  'KYD': 0.83,         // Cayman Islands Dollar
  'AWG': 1.79,         // Aruba Florin
  'ANG': 1.79,         // Netherlands Antillean Guilder
  'BSD': 1.0,          // Bahamian Dollar
  'BZD': 2.0,          // Belize Dollar
  'HTG': 132.0,        // Haitian Gourde
  'DOP': 56.0,         // Dominican Peso
  'CUP': 24.0,         // Cuban Peso
  'CUC': 1.0,          // Cuban Convertible Peso
  'SRD': 38.0,         // Surinamese Dollar
  'GYD': 209.0,        // Guyanese Dollar
  
  // Major World Currencies
  'EUR': 0.92,
  'GBP': 0.79,
  'CAD': 1.36,
  'AUD': 1.53,
  'JPY': 149.50,
  'CNY': 7.24,
  'INR': 83.12,
  'MXN': 17.15,
  'BRL': 4.97,
  'COP': 3950.0,
  
  // Crypto (approximate)
  'BTC': 0.000015,
  'ETH': 0.00035,
};

const CURRENCY_INFO: Record<string, { name: string; symbol: string; flag: string }> = {
  'USD': { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  'JMD': { name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
  'TTD': { name: 'Trinidad Dollar', symbol: 'TT$', flag: '🇹🇹' },
  'BBD': { name: 'Barbados Dollar', symbol: 'Bds$', flag: '🇧🇧' },
  'XCD': { name: 'East Caribbean Dollar', symbol: 'EC$', flag: '🌴' },
  'KYD': { name: 'Cayman Dollar', symbol: 'CI$', flag: '🇰🇾' },
  'AWG': { name: 'Aruba Florin', symbol: 'Afl', flag: '🇦🇼' },
  'ANG': { name: 'Netherlands Antillean Guilder', symbol: 'NAf', flag: '🇨🇼' },
  'BSD': { name: 'Bahamian Dollar', symbol: 'B$', flag: '🇧🇸' },
  'BZD': { name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿' },
  'HTG': { name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹' },
  'DOP': { name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
  'CUP': { name: 'Cuban Peso', symbol: '₱', flag: '🇨🇺' },
  'SRD': { name: 'Surinamese Dollar', symbol: '$', flag: '🇸🇷' },
  'GYD': { name: 'Guyanese Dollar', symbol: 'G$', flag: '🇬🇾' },
  'EUR': { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  'GBP': { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  'CAD': { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  'AUD': { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  'JPY': { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  'CNY': { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  'INR': { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  'MXN': { name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  'BRL': { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  'BTC': { name: 'Bitcoin', symbol: '₿', flag: '₿' },
  'ETH': { name: 'Ethereum', symbol: 'Ξ', flag: '⟠' },
};

// GET - Get all supported currencies or convert amount
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from')?.toUpperCase();
  const to = searchParams.get('to')?.toUpperCase();
  const amount = parseFloat(searchParams.get('amount') || '1');
  const format = searchParams.get('format') || 'json'; // 'json' or 'compact'

  // Get all currencies
  if (!from && !to) {
    const currencies = Object.keys(EXCHANGE_RATES).map(code => ({
      code,
      ...CURRENCY_INFO[code],
      rateToUSD: EXCHANGE_RATES[code],
    }));

    return NextResponse.json({
      success: true,
      base: 'USD',
      lastUpdated: new Date().toISOString(),
      count: currencies.length,
      currencies: format === 'compact' 
        ? currencies.map(c => ({ code: c.code, name: c.name, symbol: c.symbol }))
        : currencies,
    });
  }

  // Convert single amount
  if (from && to) {
    const fromRate = EXCHANGE_RATES[from];
    const toRate = EXCHANGE_RATES[to];

    if (!fromRate || !toRate) {
      return NextResponse.json(
        { error: 'Invalid currency code. Use GET /api/services/currency to see supported currencies.' },
        { status: 400 }
      );
    }

    const convertedAmount = (amount / fromRate) * toRate;
    const exchangeRate = toRate / fromRate;

    return NextResponse.json({
      success: true,
      from: {
        code: from,
        ...CURRENCY_INFO[from],
        amount: amount,
      },
      to: {
        code: to,
        ...CURRENCY_INFO[to],
        amount: parseFloat(convertedAmount.toFixed(2)),
      },
      exchangeRate: parseFloat(exchangeRate.toFixed(6)),
      lastUpdated: new Date().toISOString(),
    });
  }

  // Convert to all currencies
  if (from && !to) {
    const fromRate = EXCHANGE_RATES[from];
    
    if (!fromRate) {
      return NextResponse.json(
        { error: 'Invalid currency code' },
        { status: 400 }
      );
    }

    const conversions = Object.keys(EXCHANGE_RATES)
      .filter(code => code !== from)
      .map(code => ({
        code,
        ...CURRENCY_INFO[code],
        amount: parseFloat(((amount / fromRate) * EXCHANGE_RATES[code]).toFixed(2)),
        rate: parseFloat((EXCHANGE_RATES[code] / fromRate).toFixed(6)),
      }))
      .sort((a, b) => b.amount - a.amount);

    return NextResponse.json({
      success: true,
      from: {
        code: from,
        ...CURRENCY_INFO[from],
        amount: amount,
      },
      conversions,
      lastUpdated: new Date().toISOString(),
    });
  }

  return NextResponse.json(
    { error: 'Missing parameters. Use ?from=USD&to=JMD&amount=100 or ?from=USD to convert to all currencies.' },
    { status: 400 }
  );
}

// POST - Batch conversions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from = 'USD', amounts = [], to = 'EUR' } = body;

    const fromRate = EXCHANGE_RATES[from];
    const toRate = EXCHANGE_RATES[to];

    if (!fromRate || !toRate) {
      return NextResponse.json(
        { error: 'Invalid currency code' },
        { status: 400 }
      );
    }

    const results = amounts.map((amount: number) => ({
      from: amount,
      to: parseFloat(((amount / fromRate) * toRate).toFixed(2)),
    }));

    return NextResponse.json({
      success: true,
      from,
      to,
      results,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}