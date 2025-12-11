// src/routes/api/products/+server.js
import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

/**
 * GET handler for /api/products
 * Returns all products as JSON
 */
export async function GET() {
  try {
    // Fetch all products from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    // Return products as JSON with proper headers
    return json(data, {
      headers: {
        'Cache-Control': 'max-age=60' // Cache for 60 seconds
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Return error response
    return json(
      { 
        error: 'Failed to fetch products',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
