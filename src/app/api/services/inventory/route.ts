import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  cost: number;
  lastUpdated: string;
}

// In-memory store (would connect to database in production)
const inventory: Map<string, InventoryItem> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, item } = body;

    let response: any = { success: true };

    switch (action) {
      case 'add':
        const newItem: InventoryItem = {
          id: `SKU-${Date.now()}`,
          sku: item.sku || `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          name: item.name,
          category: item.category || 'General',
          quantity: item.quantity || 0,
          minStock: item.minStock || 10,
          price: item.price || 0,
          cost: item.cost || 0,
          lastUpdated: new Date().toISOString()
        };
        inventory.set(newItem.id, newItem);
        response.item = newItem;
        break;

      case 'update':
        const existing = inventory.get(item.id);
        if (!existing) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        const updated = { ...existing, ...item, lastUpdated: new Date().toISOString() };
        inventory.set(item.id, updated);
        response.item = updated;
        break;

      case 'adjust':
        const current = inventory.get(item.id);
        if (!current) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        const adjustment = item.adjustment || 0;
        const newQuantity = Math.max(0, current.quantity + adjustment);
        current.quantity = newQuantity;
        current.lastUpdated = new Date().toISOString();
        inventory.set(item.id, current);
        response.item = current;
        response.notification = newQuantity <= current.minStock 
          ? `⚠️ Low stock alert: ${current.name}` 
          : null;
        break;

      case 'list':
        const items = Array.from(inventory.values());
        const lowStock = items.filter(i => i.quantity <= i.minStock);
        response.items = items;
        response.stats = {
          totalItems: items.length,
          totalValue: items.reduce((sum, i) => sum + (i.quantity * i.cost), 0),
          lowStockCount: lowStock.length
        };
        break;

      case 'get':
        const found = inventory.get(item.id);
        if (!found) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        response.item = found;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Inventory error:', error);
    return NextResponse.json({ error: 'Inventory operation failed' }, { status: 500 });
  }
}