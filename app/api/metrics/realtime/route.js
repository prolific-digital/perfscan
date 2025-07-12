import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/realtime-metrics.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    // Add some randomization to simulate real-time changes
    Object.keys(data.systems).forEach(systemId => {
      const system = data.systems[systemId];
      
      // Slightly randomize CPU utilization
      if (system.cpu) {
        system.cpu.utilization = Math.max(0, Math.min(100, 
          system.cpu.utilization + (Math.random() - 0.5) * 5
        ));
      }
      
      // Slightly randomize memory utilization
      if (system.memory) {
        system.memory.utilization = Math.max(0, Math.min(100, 
          system.memory.utilization + (Math.random() - 0.5) * 3
        ));
      }
      
      // Update timestamp
      system.timestamp = new Date().toISOString();
    });
    
    // Update main timestamp
    data.timestamp = new Date().toISOString();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load realtime metrics data' },
      { status: 500 }
    );
  }
}