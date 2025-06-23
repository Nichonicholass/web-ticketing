import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fp_mbd',
    port: parseInt(process.env.DB_PORT || '3307'),
}

export async function GET(request: NextRequest) {
    let connection;

    try {
        // test daabase connection
        connection = await mysql.createConnection(dbConfig);
        await connection.execute('SELECT 1');
        return NextResponse.json({
            success: true,
            message: 'Database connection successful'
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            success: false,
            error: {
                Message: 'Database connection failed'
            }
        }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}