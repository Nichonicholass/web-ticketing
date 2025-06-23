import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fp_mbd',
  port: parseInt(process.env.DB_PORT || '3307'),
};

export async function POST(request: NextRequest) {
  let connection;
  
  try {
    const body = await request.json();
    const { phone_number, password } = body;

    // Validate input
    if (!phone_number || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Nomor telepon dan password harus diisi'
          }
        },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Call the login stored procedure
    const [rows] = await connection.execute(`
      CALL user_login(?, ?, @result, @message, @token, @user_data);
    `, [phone_number, password]);

    // Get the output parameters
    const [output] = await connection.execute(`
      SELECT @result as result, @message as message, @token as token, @user_data as user_data;
    `);

    const result = (output as any)[0];

    if (result.result === 'SUCCESS') {
      const userData = result.user_data ? JSON.parse(result.user_data) : null;
      
      return NextResponse.json({
        success: true,
        message: result.message,
        data: {
          token: result.token,
          user: userData
        }
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: result.message
          }
        },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          Message: 'Terjadi kesalahan server'
        }
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}