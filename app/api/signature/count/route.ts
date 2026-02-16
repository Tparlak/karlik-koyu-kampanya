import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
    try {
        if (!supabaseAdmin) {
            // Mock count when Supabase is not configured
            return NextResponse.json({ count: 247 });
        }

        const { count, error } = await supabaseAdmin
            .from('signatures')
            .select('*', { count: 'exact', head: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ count: count || 0 });
    } catch {
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
