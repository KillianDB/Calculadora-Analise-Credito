// src/hooks/useToast.ts
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type ToastStatus = "error" | "success" | "warning" | "info";

export const useAppToast = () => {
  const toast = useToast();

  const showToast = useCallback((
    message: string,
    status: ToastStatus = "error",
    duration: number = 5000
  ) => {
    toast({
      title: status.charAt(0).toUpperCase() + status.slice(1), // "Error" | "Success"...
      description: message,
      status,
      duration,
      isClosable: true,
      position: "top-right",
      variant: "left-accent",
    });
  }, [toast]);

  return { showToast };
};