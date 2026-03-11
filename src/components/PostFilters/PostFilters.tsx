import * as Select from "@radix-ui/react-select";
import { FiSearch } from "react-icons/fi";

interface PostFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: "newest" | "oldest" | "most_liked";
  setSortBy: (value: "newest" | "oldest" | "most_liked") => void;
}

export function PostFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: PostFiltersProps) {
  return (
    <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-[#CCCCCC] bg-white p-6 sm:flex-row">
      <div className="flex w-full flex-1 flex-col gap-2">
        <label className="text-[16px] text-black">Search posts</label>

        <div className="flex w-full items-center gap-2 rounded-lg border border-[#777777] bg-white px-3 transition-colors focus-within:border-[#7695EC]">
          <FiSearch size={18} className="text-[#777777]" />

          <input
            type="text"
            placeholder="Search by title, content or username..."
            className="w-full bg-transparent py-2 text-[14px] placeholder:text-[#CCCCCC] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-48">
        <label className="text-[16px] text-black">Sort by</label>

        <Select.Root value={sortBy} onValueChange={setSortBy}>
          <Select.Trigger className="flex items-center justify-between rounded-lg border border-[#777777] px-3 py-2 text-[14px] text-[#777777] focus:outline-none">
            <Select.Value />
            <Select.Icon>▾</Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="rounded-lg border border-[#CCCCCC] bg-white shadow-md">
              <Select.Viewport className="p-1">
                <Select.Item
                  value="newest"
                  className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-[#F5F5F5]"
                >
                  <Select.ItemText>Newest First</Select.ItemText>
                </Select.Item>

                <Select.Item
                  value="oldest"
                  className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-[#F5F5F5]"
                >
                  <Select.ItemText>Oldest First</Select.ItemText>
                </Select.Item>

                <Select.Item
                  value="most_liked"
                  className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-[#F5F5F5]"
                >
                  <Select.ItemText>Most Liked</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}
