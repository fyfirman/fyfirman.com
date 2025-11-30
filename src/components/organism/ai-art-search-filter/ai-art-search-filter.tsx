import React, { useState, useEffect } from "react";
import { clsx } from "~/helpers/classname-helper";
import styles from "./ai-art-search-filter.module.scss";

interface AIArtSearchFilterProps {
  searchTerm: string;
  selectedTags: string[];
  allTags: string[];
  onSearchChange: (term: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  resultsCount: number;
  loading?: boolean;
}

const AIArtSearchFilter: React.FC<AIArtSearchFilterProps> = ({
  searchTerm,
  selectedTags,
  allTags,
  onSearchChange,
  onTagToggle,
  onClearFilters,
  resultsCount,
  loading = false,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const hasActiveFilters = searchTerm.length > 0 || selectedTags.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.filterSection}`)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchInputContainer}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            placeholder="Search AI art..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
            disabled={loading}
          />
          {searchTerm ? (
            <button className={styles.clearSearchButton} onClick={() => onSearchChange("")}>
              ×
            </button>
          ) : null}
        </div>

        <div className={styles.filterSection}>
          <button
            className={clsx([
              styles.filterToggle,
              isFilterOpen && styles.active,
              selectedTags.length > 0 && styles.hasFilters,
            ])}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span>🏷️ Filters</span>
            {selectedTags.length > 0 ? <span className={styles.filterCount}>{selectedTags.length}</span> : null}
          </button>

          {isFilterOpen ? (
            <div className={styles.filterDropdown}>
              <div className={styles.filterHeader}>
                <span>Filter by Tags</span>
                {selectedTags.length > 0 ? (
                  <button className={styles.clearFiltersButton} onClick={onClearFilters}>
                    Clear All
                  </button>
                ) : null}
              </div>

              <div className={styles.tagsContainer}>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={clsx([styles.tagFilter, selectedTags.includes(tag) && styles.selected])}
                    onClick={() => onTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.resultsSection}>
        {loading ? (
          <div className={styles.loadingText}>Searching...</div>
        ) : (
          <div className={styles.resultsText}>
            {resultsCount} {resultsCount === 1 ? "artwork" : "artworks"}
            {hasActiveFilters ? " found" : null}
          </div>
        )}

        {hasActiveFilters && !loading ? (
          <button className={styles.clearAllButton} onClick={onClearFilters}>
            Clear all filters
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(AIArtSearchFilter);
