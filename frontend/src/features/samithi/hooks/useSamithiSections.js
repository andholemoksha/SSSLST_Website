import { samithiContent, samithiSections } from "@/content/samithiConnect";

export function useSamithiContent() {
  return samithiContent;
}

export function useSamithiSections() {
  return {
    data: samithiSections,
    isLoading: false,
    isError: false,
  };
}