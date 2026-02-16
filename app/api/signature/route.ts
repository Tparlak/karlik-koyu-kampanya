import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

// POST - Create a new signature
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { first_name, last_name, email, message } = body;

        // Validate required fields
        if (!first_name?.trim() || !last_name?.trim() || !email?.trim()) {
            return NextResponse.json(
                { error: 'Ad, soyad ve e-posta alanları zorunludur.' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Geçerli bir e-posta adresi girin.' },
                { status: 400 }
            );
        }

        if (!supabaseAdmin) {
            // Mock response for when Supabase is not configured
            return NextResponse.json({
                success: true,
                data: {
                    id: crypto.randomUUID(),
                    first_name: first_name.trim(),
                    last_name: last_name.trim(),
                    email: email.trim().toLowerCase(),
                    message: message?.trim() || null,
                    created_at: new Date().toISOString(),
                },
            });
        }

        const { data, error } = await supabaseAdmin
            .from('signatures')
            .insert({
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                email: email.trim().toLowerCase(),
                message: message?.trim() || null,
            })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'Bu e-posta adresi ile daha önce imza verilmiş (duplicate).' },
                    { status: 409 }
                );
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch {
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}

// GET - List signatures (for admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '0');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');

        if (!supabaseAdmin) {
            // Mock response
            return NextResponse.json({
                signatures: [],
                total: 0,
            });
        }

        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabaseAdmin
            .from('signatures')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            signatures: data || [],
            total: count || 0,
        });
    } catch {
        return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
    }
}

// DELETE - Delete a signature (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID gereklidir.' }, { status: 400 });
        }

        if (!supabaseAdmin) {
            return NextResponse.json({ success: true });
        }

        const { error } = await supabaseAdmin
            .from('signatures')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
    }
}
