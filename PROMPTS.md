***
# AI Prompts Documentation for Interview

This document records the exact prompts used to engage AI tools. Each prompt is accompanied by a rephrased explanation describing the specific purpose or area of the project it supported. This highlights the rationale behind the AI queries and your methodical approach.

## Prompts

### 1. Create a Anime Search App using - React 18 or higher , React hooks only (no class components), TypeScript, react-router-dom for navigation, Redux for state management, Tailwind.css (latest with config and postcss), Single Page App only (no Next.js). List all the steps  
*Context:* Initial project setup and configuration guidelines.

### 2. (Provide anime details api response in json) Design a Anime Detail page that includes all the information from the above json  
*Context:* UI design for the anime detail view, leveraging the API data schema.

### 3. ```TextGenerateEffect.tsx```
For screen lg and above, the word "Explore The Diverse Realms of Anime Magic" should break into 3 lines e.g. "Explore The", "Diverse Realms", "of Anime Magic"  
*Context:* Responsive styling instructions for the hero header component.

### 4. ```AuroraBackground.js``` Infer types for the above component props  
*Context:* Adding TypeScript prop types for a React background component.

### 5. ```classNames.js (utils)``` Convert to ts  
*Context:* Migrating JavaScript utility code to TypeScript.

### 6. ```Part of src/pages/AnimeDetail.tsx logic``` Give me the redux slice way for this anime detail logic  
*Context:* Refactoring page logic into Redux slice following best practices.

### 7. ```useInfiniteScroll.js``` Convert to ts and infer type using type instead of interface  
*Context:* TypeScript conversion of infinite scroll hook with specific type usage.

### 8. Lodash that return unique items in an array based on id  
*Context:* Handling de-duplication of array items during infinite-loading merges.

### 9. ```animeSlice.ts & AnimeList.tsx``` Refactor and move the initialLoad and getAnimes functions in the AnimeList component to the slice  
*Context:* Code maintainability improvement by relocating data fetching logic into Redux slice.

### 10. Based on the previous result, for this part of the UI:  
```jsx
<section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
  {loading
    ? [...Array(4).keys()].map((item) => (
        <Skeleton
          key={`loading-${item}`}
          className="m-4 rounded-xl bg-gray-300 dark:bg-gray-500"
          height={400}
        />
      ))
    : data.map((anime, index) => (
        <AnimeCard key={anime.mal_id} anime={anime} index={index} />
      ))}
</section>
```
### Please add the skeleton loading under the AnimeCard list when load more get trigger  
*Context:* Incorporate loading skeletons on infinite scroll load more in Redux slice logic.

### 11. The dev server should start on port 4000  
*Context:* Modify development server configuration to listen on a specific port.

### 12. ```animeSlice.ts``` Add unit tests for the above redux slice  
*Context:* Creating tests to ensure Redux slice functionality correctness.

### 13. ```tsconfig.json, tsconfig.app.json, tsconfig.node.json``` These 3 files is generated when project initialized. Please fix these config files so that it support vitest test  
*Context:* Resolving TypeScript config issues for smooth unit testing setup.

### 14. ```animeApi's function in animeSlice.ts``` I don't want to call this api endpoint, just mock the api and response/error will do
*Context:* Implementing mock API responses for stable testing environment.

### 15. `"build": "tsc -b && vite build"` What is tsc -b for?  
*Context:* Clarifying the role of `tsc -b` in the build pipeline.

### 16. Advanced filtering  
- Genres (shounen, romance, comedy, etc.)  
- Type (TV, Movie, OVA) Status (airing, finished) Rating (PG, R17, etc.)  
- Sort by: score, popularity, newest, most episodes  
Add this feature that is supported by [https://docs.api.jikan.moe/#tag/anime](https://docs.api.jikan.moe/#tag/anime)  
*Context:* Implementing multi-criteria filtering and sorting utilizing Jikan API capabilities.

### 17. Whenever there's search query, scroll the page to most top  
*Context:* UX enhancement to reset scroll position on new search input.

### 18. `SearchBar.tsx DebounceSearch.tsx useDebounce.ts` A few asks and replies regarding clearing search query at search input with debounce effect bug  
*Context:* Debugging and fixing debounce-related search input bugs.

### 19. ```Code for Dialog Filter part in NavigationBar.tsx``` When user changes select option inside dialog and close the dialog without clicking Apply, it does not reset to previous filter values  
*Context:* Fix UX bug ensuring filter dialog reverts changes on close without apply.
***