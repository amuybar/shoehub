"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (query: string) => void;
}

interface Suggestion {
  title: string;
  slug: string;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch("/api/shoes/"); // Your API endpoint
        const data = await response.json();
        setSuggestions(
          data.shoes.map((shoe: any) => ({
            title: shoe.title,
            slug: shoe.slug.current,
          }))
        ); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowDropdown(true);
  };

  const handleSearch = () => {
    // Find the suggestion that matches the query
    const matchedSuggestion = suggestions.find(
      (suggestion) => suggestion.title.toLowerCase() === query.toLowerCase()
    );

    if (matchedSuggestion) {
      router.push(`/details/${matchedSuggestion.slug}`);
    } else {
      onSearch(query);
    }

    setShowDropdown(false);
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/details/${slug}`);
    setQuery(""); // Clear the search input
    setShowDropdown(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for shoes..."
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        <FiSearch />
      </button>
      {showDropdown && suggestions.length > 0 && (
        <ul className={styles.dropdown}>
          {suggestions
            .filter((suggestion) =>
              suggestion.title?.toLowerCase().includes(query.toLowerCase())
            )
            .map((suggestion) => (
              <li
                key={suggestion.slug}
                onClick={() => handleSuggestionClick(suggestion.slug)}
                className={styles.dropdownItem}
              >
                {suggestion.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
