"use client";

import React, { useCallback, useEffect, useState } from "react";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { NextClient } from "@/tools/NextClient";
import { PageMeta } from "@/model/shared/types/PageMeta";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
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
        setHasNext(data.meta?.hasNext);

        if (data.meta?.totalPages) {
          setTotalPages(Math.ceil(data.meta.totalPages));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [action, limit, setData, setLoading],
  );

  useEffect(() => {
    onFetch(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, onFetch]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pb-12">
      <Button
        icon={faAngleRight}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={getButtonStyles(false)}
      />

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            onClick={() => handlePageChange(p)}
            className={getButtonStyles(p === page)}
          >
            <span className="text-xs font-black">{p}</span>
          </Button>
        ))}
      </div>

      <Button
        icon={faAngleLeft}
        disabled={!hasNext}
        onClick={() => handlePageChange(page + 1)}
        className={getButtonStyles(false)}
      />
    </div>
  );
};
