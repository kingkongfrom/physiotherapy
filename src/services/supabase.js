import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fqpnunykkdxvsmgpebdq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG51bnlra2R4dnNtZ3BlYmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjQ1MDksImV4cCI6MjAxNTY0MDUwOX0.zmEYcogtazQyRngV--MTRuhPO8ffpSaaPU_gF6tdboI"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;