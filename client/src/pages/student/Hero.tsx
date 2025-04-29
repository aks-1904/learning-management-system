import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Hero = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4 mt-10">
          Find the Best Courses
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          quasi illo natus, laboriosam, molestias molestiae quas modi ex commodi
          vitae perferendis dolores nesciunt! Atque exercitationem in
          repellendus neque consectetur officia.
        </p>
        <form className="flex items-center bg-transparent dark:bg-gray-700 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search anything..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-black dark:text-gray-100 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto bg-white dark:bg-gray-700"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-r-full hover:bg-blue-700 hover:dark:bg-blue-800"
          >
            Search
          </Button>
        </form>
        <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-100 hover:dark:bg-gray-700">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default Hero;
