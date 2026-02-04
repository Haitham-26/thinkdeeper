"use client";

import React, { useCallback, useEffect } from "react";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { NextClient } from "@/tools/NextClient";
import { PageMeta } from "@/model/shared/types/PageMeta";
import { useGlobalContext } from "../questions/context/global-context";

const getButtonStyles = (active?: boolean) => {
  const base =
    "w-10 h-10 !p-2 flex items-center justify-center rounded-xl border transition-all shadow-none";

  if (active) {
    return `${base} !bg-accent !text-white !border-accent`;
  }
  return `${base} !bg-surface !border-border !text-text-muted hover:!border-accent hover:!text-accent`;
};

type PaginationProps = {
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  action: {
    endpoint: string;
    data?: Record<string, any>;
    method?: "POST" | "GET";
  };
  limit?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  setData,
  setLoading,
  action,
  limit = 5,
}) => {
  const { globalMeta, setGlobalMeta } = useGlobalContext();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= globalMeta.totalPages) {
      setGlobalMeta((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const onFetch = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);

        const { endpoint, ...restActionProps } = action;

        const { data } = await NextClient<{ data: any[]; meta: PageMeta }>(
          endpoint,
          {
            ...restActionProps,
            data: { ...restActionProps?.data, page: pageNumber, limit },
            params: { page: pageNumber, limit },
          },
        );

        setData(data);
        setGlobalMeta((prev) => ({ ...prev, hasNext: data.meta?.hasNext }));

        if (data.meta?.totalPages) {
          setGlobalMeta((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.meta.totalPages),
          }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [action, limit, setData, setLoading, setGlobalMeta],
  );

  useEffect(() => {
    onFetch(globalMeta.currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [globalMeta.currentPage, onFetch]);

  if (globalMeta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pb-12">
      <Button
        icon={faAngleRight}
        disabled={globalMeta.currentPage === 1}
        onClick={() => handlePageChange(globalMeta.currentPage - 1)}
        className={getButtonStyles(false)}
      />

      <div className="flex items-center gap-2">
        {Array.from({ length: globalMeta.totalPages }, (_, i) => i + 1).map(
          (p) => (
            <Button
              key={p}
              onClick={() => handlePageChange(p)}
              className={getButtonStyles(p === globalMeta.currentPage)}
            >
              <span className="text-xs font-black">{p}</span>
            </Button>
          ),
        )}
      </div>

      <Button
        icon={faAngleLeft}
        disabled={!globalMeta.hasNext}
        onClick={() => handlePageChange(globalMeta.currentPage + 1)}
        className={getButtonStyles(false)}
      />
    </div>
  );
};
