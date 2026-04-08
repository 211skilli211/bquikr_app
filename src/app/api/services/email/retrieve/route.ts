import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, limit = 10 } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Email retrieval API not configured',
        setup: 'Get API key from https://abstractapi.com'
      }, { status: 500 });
    }

    // Abstract API email finder
    const response = await fetch(
      `https://emailverification.abstractapi.com/v1/company?api_key=${apiKey}&domain=${encodeURIComponent(domain)}`
    );

    if (!response.ok) {
      throw new Error('Email retrieval service error');
    }

    const data = await response.json();
    
    // Format response
    const employees = data.emails?.slice(0, limit).map((email: string, i: number) => ({
      email,
      name: `Employee ${i + 1}`,
      title: 'Team Member',
    })) || [];

    return NextResponse.json({
      success: true,
      domain,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error('Email retrieval error:', error);
    return NextResponse.json({ error: 'Retrieval failed' }, { status: 500 });
  }
}