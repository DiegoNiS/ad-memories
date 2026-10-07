import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function recordProposalAcceptance(): Promise<Date> {
  const now = new Date();
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('milestones')
        .insert([{ type: 'proposal_accepted', created_at: now.toISOString() }])
        .select()
        .single();

      if (!error && data?.created_at) {
        return new Date(data.created_at);
      }
    }
  } catch (err) {
    console.warn('Supabase post notice (using local fallback timestamp):', err);
  }
  return now;
}
