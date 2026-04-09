import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Invoice {
  id: string;
  customer: string;
  items: Array<{ description: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: string;
  dueDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, invoice } = body;

    // Calculate totals
    const calculateTotals = (items: any[]) => {
      const subtotal = items.reduce((sum: number, item: any) => 
        sum + (item.quantity * item.price), 0);
      const tax = subtotal * 0.15; // 15% tax rate
      return { subtotal, tax, total: subtotal + tax };
    };

    let response: any = { success: true };

    switch (action) {
      case 'create':
        const newInvoice: Invoice = {
          id: `INV-${Date.now()}`,
          customer: invoice.customer,
          items: invoice.items || [],
          ...calculateTotals(invoice.items || []),
          status: 'draft',
          createdAt: new Date().toISOString(),
          dueDate: invoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        response.invoice = newInvoice;
        break;

      case 'status':
        response.status = invoice.status;
        response.message = `Invoice ${invoice.id} marked as ${invoice.status}`;
        break;

      case 'calculate':
        response.totals = calculateTotals(invoice.items || []);
        break;

      case 'validate':
        const validationErrors: string[] = [];
        if (!invoice.customer) validationErrors.push('Customer is required');
        if (!invoice.items?.length) validationErrors.push('At least one item required');
        invoice.items?.forEach((item: any, i: number) => {
          if (!item.description) validationErrors.push(`Item ${i + 1}: description required`);
          if (!item.price || item.price <= 0) validationErrors.push(`Item ${i + 1}: valid price required`);
        });
        response.valid = validationErrors.length === 0;
        response.errors = validationErrors;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Invoice error:', error);
    return NextResponse.json({ error: 'Invoice operation failed' }, { status: 500 });
  }
}