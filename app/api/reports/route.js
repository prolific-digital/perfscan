import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/reports.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load reports data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const reportData = await request.json();
    
    // In a real app, this would save to database
    // For now, we'll just return a success response
    const newReport = {
      id: Date.now().toString(),
      ...reportData,
      createdAt: new Date().toISOString(),
      status: 'generating'
    };
    
    return NextResponse.json({
      success: true,
      data: newReport,
      message: 'Report generation started'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}