import { SelectItem } from "@mantine/core";
import { notebookType } from "../types/notebook";

const NotebookConvertedSchema = (list: notebookType[]): SelectItem[] => {
  return list
    ? list.map((item) => ({
        label: item?.name,
        value: item?.id?.toString() as string,
      }))
    : [];
};

export const convertSchema = {
  NotebookConvertedSchema,
};
