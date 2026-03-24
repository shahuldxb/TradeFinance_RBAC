import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type SearchFilterBarProps = {
  statusFilter: string;
  onStatusChange: (value: string) => void;
};

export default function SearchFilterBar({
  statusFilter,
  onStatusChange
}: SearchFilterBarProps) {
  return (
    <Select value={statusFilter} onValueChange={onStatusChange}>
      <SelectTrigger
        className="sm:size-sm w-28 text-xs 2xl:w-60 btn-outline btn-primary border hover:border-blue-400"
        size="md"
      >
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>

      <SelectContent className="w-32 2xl:w-60">
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}
