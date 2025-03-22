import React from 'react';
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpertsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    expertise: string;
    sortBy: string;
  };
  onFilterChange: (newFilters: { expertise: string; sortBy: string }) => void;
}

export const ExpertsHeader: React.FC<ExpertsHeaderProps> = ({ searchQuery, onSearchChange, filters, onFilterChange }) => {
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleExpertiseChange = (value: string) => {
    onFilterChange({ ...filters, expertise: value });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Find Your Solana Expert
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect with top Solana developers, DeFi architects, and NFT specialists for personalized 1:1 coaching
          sessions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, expertise, or keywords..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="pl-10 bg-black/40 border-purple-500/20 focus:border-purple-400 h-12 rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filters.expertise} onValueChange={handleExpertiseChange}>
            <SelectTrigger className="w-[180px] bg-black/40 border-purple-500/20 h-12 rounded-lg">
              <SelectValue placeholder="Expertise" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-xl border border-purple-500/20">
              <SelectItem value="all">All Expertise</SelectItem>
              <SelectItem value="smart-contracts">Smart Contracts</SelectItem>
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="nft">NFT & Gaming</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="w-[180px] bg-black/40 border-purple-500/20 h-12 rounded-lg">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-xl border border-purple-500/20">
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 border-purple-500/20 hover:bg-purple-900/20 hover:border-purple-400/50"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
