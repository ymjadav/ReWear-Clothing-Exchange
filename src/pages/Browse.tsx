import React, { useEffect, useState } from "react";
import { searchItems } from "../lib/supabase";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (term = "") => {
    setLoading(true);
    try {
      const data = await searchItems(term);
      setItems(data || []);
    } catch (err) {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems(searchTerm);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 mb-8">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              {/* You can use your logo/icon here */}
              <span className="font-bold text-xl text-primary">ReWear</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link to="/browse" className="text-primary font-semibold">
              Browse
            </Link>
            <Link
              to="/add-item"
              className="text-foreground hover:text-primary transition-colors"
            >
              List an Item
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Items</h1>
        <form
          onSubmit={handleSearch}
          className="flex gap-2 mb-8 justify-center"
        >
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for clothes, brands, or styles..."
            className="max-w-md"
          />
          <Button type="submit">Search</Button>
        </form>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item: any) => (
              <Card
                key={item.id}
                className="card-hover transition-shadow hover:shadow-lg flex flex-col"
              >
                <CardContent className="p-0">
                  {/* Item Image */}
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.brand ? item.brand + " • " : ""}
                      {item.category}
                    </p>
                    <Badge variant="outline" className="mb-2">
                      {item.condition}
                    </Badge>
                    <div className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </div>
                    <Link to={`/item/${item.id}`} className="mt-auto">
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
