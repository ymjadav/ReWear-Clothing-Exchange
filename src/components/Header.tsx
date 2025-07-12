import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "@/lib/supabase";

const Header: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const isAdmin = false; // Example admin check, replace with actual logic
  const handleOnLogout = () => {
    console.log("User logged out");
    logout();
  };
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">ReWear</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link
              to="/community"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button className="btn-primary" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  className="btn-primary"
                  variant="ghost"
                  onClick={() => handleOnLogout()}
                >
                  Logout
                </Button>

                <Link to="/dashboard">
                  <Button className="btn-primary" variant="ghost">
                    Dashboard
                  </Button>
                </Link>

                {isAuthenticated && isAdmin && (
                  <Link to="/admin">
                    <Button className="btn-primary" variant="ghost">
                      Admin Panel
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
