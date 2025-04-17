import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";

interface PropTypes {
  buttonFilterTopContentLabel?: string;
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonFilterTopContent?: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {

  const {
    currentPerPage,
    currentPage,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    buttonFilterTopContentLabel,
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonFilterTopContent,
    onClickButtonTopContent,
    renderCell,
    showLimit = true,
    showSearch = true,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center w-full">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Search..."
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        <div className="flex gap-2 w-full sm:w-auto">
          {buttonFilterTopContentLabel && (
            <Button
              color="success"
              onPress={onClickButtonFilterTopContent}
              className="text-teal-600 bg-white border border-teal-600 hover:bg-teal-50 flex items-center gap-2"
            >
              <FaFilter size={16} />
              <span>{buttonFilterTopContentLabel}</span>
            </Button>
          )}

          {buttonTopContentLabel && (
            <Button
              color="success"
              onPress={onClickButtonTopContent}
              className="bg-teal-600 border border-white flex items-center gap-2"
            >
              <Image
                src="/images/general/add-square-white.svg"
                alt="icon-add"
                className="size-6 shrink-0"
                width={180}
                height={60}
              />
              <p className="text-white">{buttonTopContentLabel}</p>
            </Button>
          )}

        </div>

      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            disallowEmptySelection
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentPerPage}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Limit:</p>}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="default"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [currentPerPage, currentPage, totalPages, handleChangeLimit, handleChangePage]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading })
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="success" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
