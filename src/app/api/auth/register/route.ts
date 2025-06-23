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
    const { 
      name, 
      phone_number, 
      password
    } = body;

    // Validate required fields
    if (!name || !phone_number || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Nama, nomor telepon, dan password harus diisi'
          }
        },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone_number.replace(/[-\s]/g, ''))) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Format nomor telepon tidak valid'
          }
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Password minimal 6 karakter'
          }
        },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Nama minimal 2 karakter'
          }
        },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Call the simplified register stored procedure
    await connection.execute(`
      CALL user_register(?, ?, ?, @result, @message, @user_id);
    `, [name, phone_number, password]);

    // Get the output parameters
    const [output] = await connection.execute(`
      SELECT @result as result, @message as message, @user_id as user_id;
    `);

    const result = (output as any)[0];

    if (result.result === 'SUCCESS') {
      return NextResponse.json({
        success: true,
        message: result.message,
        data: {
          user_id: result.user_id,
          name: name,
          phone_number: phone_number
        }
      }, { status: 201 });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: result.message
          }
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Register error:', error);
    
    // Handle specific MySQL errors
    if (error instanceof Error) {
      if (error.message.includes('Duplicate entry')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              Message: 'Nomor telepon sudah terdaftar'
            }
          },
          { status: 409 }
        );
      }
    }
    
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