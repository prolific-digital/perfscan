import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/capacity-planning.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load capacity planning data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const planningData = await request.json();
    
    // In a real app, this would save to database
    // For now, we'll just return a success response
    const analysis = {
      id: Date.now().toString(),
      ...planningData,
      createdAt: new Date().toISOString(),
      recommendations: [
        'Consider upgrading memory for improved performance',
        'Monitor CPU trends for future capacity needs',
        'Optimize disk utilization across storage pools'
      ]
    };
    
    return NextResponse.json({
      success: true,
      data: analysis,
      message: 'Capacity analysis completed'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze capacity planning data' },
      { status: 500 }
    );
  }
}