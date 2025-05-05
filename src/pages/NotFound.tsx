
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-[#667085] mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
