import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fp_mbd',
  port: parseInt(process.env.DB_PORT || '3306'),
};

export async function GET(request: NextRequest) {
  let connection;
  
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Token tidak ditemukan'
          }
        },
        { status: 401 }
      );
    }

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Step 1: Get user_id from token
    await connection.execute(`
      CALL get_user_by_token(?, @result, @message, @user_data);
    `, [token]);

    // Get the token validation result
    const [tokenOutput] = await connection.execute(`
      SELECT @result as result, @message as message, @user_data as user_data;
    `);

    const tokenResult = (tokenOutput as any)[0];

    if (tokenResult.result !== 'SUCCESS') {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: tokenResult.message || 'Invalid token'
          }
        },
        { status: 401 }
      );
    }

    // Extract user_id from token validation result
    const tokenUserData = tokenResult.user_data ? JSON.parse(tokenResult.user_data) : null;
    if (!tokenUserData || !tokenUserData.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: 'Invalid user data from token'
          }
        },
        { status: 401 }
      );
    }

    const user_id = tokenUserData.id;

    // Step 2: Get user data with membership info
    await connection.execute(`
      CALL get_pelanggan_with_membership(?, @result2, @message2, @user_data2);
    `, [user_id]);

    const [membershipOutput] = await connection.execute(`
      SELECT @result2 as result, @message2 as message, @user_data2 as user_data;
    `);

    const membershipResult = (membershipOutput as any)[0];

    if (membershipResult.result === 'SUCCESS') {
      const userData = membershipResult.user_data ? JSON.parse(membershipResult.user_data) : null;
      
      return NextResponse.json({
        success: true,
        message: membershipResult.message,
        data: userData
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            Message: membershipResult.message
          }
        },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Get profile error:', error);
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