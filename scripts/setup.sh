#!/bin/bash

echo "🚀 Cognitive Console Setup"
echo ""

if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please edit with your credentials."
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase and OpenAI credentials"
echo "2. Run the migration in Supabase SQL Editor (supabase/migrations/001_initial_schema.sql)"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "See SETUP.md for detailed instructions."
