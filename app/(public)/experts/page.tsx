"use client"

import React, { useState, useEffect } from 'react';
import { ExpertsList } from "@/components/experts/experts-list";
import { ExpertsHeader } from "@/components/experts/experts-header";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import axios from 'axios';

export interface Expert {
  id: string
  userId: string
  tags: string[]
  availableWeekDays: string[]
  startTimeSlot: string
  endTimeSlot: string
  hourlyRate: number
  rating: number
  reviewCount: number
  user: {
    id: string
    name: string
    role: string
    email: string
    bio: string | null
    image: string
  }
}

export default function ExpertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    expertise: '',
    sortBy: '',
    tags: [],
    minRating: undefined,
    maxPrice: undefined
  });
  const [experts, setExperts] = useState<Expert[]>();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get('/api/expertlist', {
          params: {
            search: searchQuery,
            tags: filters.tags.join(','),
            sortByPrice: filters.sortBy,
            limit: 10,
            page: 1,
          },
        });
        const data: Expert[] = response.data as Expert[];
        setExperts(data);
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExperts();
  }, [searchQuery, filters]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <ExpertsHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        {experts ?
          <ExpertsList
            searchQuery={searchQuery}
            filters={filters}
            experts={experts}
          />
          :
          <div className="flex justify-center items-center h-full">
            <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </div>
        }
      </main>
      <Footer/>
    </div>
  );
}
