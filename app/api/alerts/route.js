import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/events-alerts.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load alerts data' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { alertId, action, ...updateData } = await request.json();
    
    // In a real app, this would update the database
    // For now, we'll just return a success response
    
    if (action === 'acknowledge') {
      return NextResponse.json({
        success: true,
        message: 'Alert acknowledged successfully',
        alertId,
        acknowledgedAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Alert updated successfully',
      alertId
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}