import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  RefreshCw,
  Heart,
  Star,
  Search,
  Shirt,
  Package,
  TrendingUp,
  Users,
  Recycle,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      user: "Sarah J.",
      category: "Outerwear",
      condition: "Excellent",
      points: 45,
      image: "",
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      user: "Emma W.",
      category: "Dresses",
      condition: "Like New",
      points: 38,
      image: "",
    },
    {
      id: 3,
      title: "Designer Sneakers",
      user: "Mike D.",
      category: "Shoes",
      condition: "Very Good",
      points: 52,
      image: "",
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      user: "Lisa C.",
      category: "Outerwear",
      condition: "Good",
      points: 42,
      image: "",
    },
  ];

  const categories = [
    { name: "Tops", icon: Shirt, count: 245 },
    { name: "Bottoms", icon: Package, count: 189 },
    { name: "Dresses", icon: Heart, count: 156 },
    { name: "Outerwear", icon: Shirt, count: 98 },
    { name: "Shoes", icon: Package, count: 134 },
    { name: "Accessories", icon: Star, count: 67 },
  ];

  const stats = [
    { label: "Active Users", value: "1,245", icon: Users },
    { label: "Items Exchanged", value: "3,892", icon: RefreshCw },
    { label: "CO² Saved", value: "2.1 tons", icon: Leaf },
  ];

  // Use state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(true); // true means logged in

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
                    onClick={() => setIsAuthenticated(false)}
                  >
                    Logout
                  </Button>

                  <Link to="/dashboard">
                    <Button className="btn-primary" variant="ghost">
                      Profile
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Sustainable Fashion
            <span className="block text-primary">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the ReWear community to swap, share, and discover amazing
            clothing pieces while reducing fashion waste together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="btn-primary px-8">
                Start Swapping
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="px-8">
                Browse Items
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for clothes, brands, or styles..."
                className="pl-10 py-3 text-base"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover amazing clothing pieces across all categories, from
              everyday basics to special occasion wear.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} items
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Items</h2>
              <p className="text-muted-foreground">
                Check out these amazing pieces from our community
              </p>
            </div>
            <Link to="/browse">
              <Button variant="outline">
                View All
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Link key={item.id} to={`/item/${item.id}`}>
                <Card className="card-hover">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                      <Shirt className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.points} pts
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        by {item.user} • {item.category}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How ReWear Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start your sustainable fashion journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. List Your Items</h3>
              <p className="text-muted-foreground">
                Upload photos and details of clothes you no longer wear
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Swap or Redeem</h3>
              <p className="text-muted-foreground">
                Exchange directly with others or use points to redeem items
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Make Impact</h3>
              <p className="text-muted-foreground">
                Reduce waste and discover unique pieces while earning points
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Start your sustainable fashion journey today and be part of a
            community that cares about the planet.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-primary">ReWear</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making sustainable fashion accessible to everyone through
                community-driven clothing exchange.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-primary transition-colors"
                  >
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-primary transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stories"
                    className="hover:text-primary transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="hover:text-primary transition-colors"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 ReWear. All rights reserved. Built with sustainability
              in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
