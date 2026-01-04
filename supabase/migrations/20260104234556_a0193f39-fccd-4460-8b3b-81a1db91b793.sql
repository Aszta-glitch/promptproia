-- Add name column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS notifications_email BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notifications_push BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'dark';

-- Update policy to allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);