"use client";

import { Spinner } from "@/app/components/Spinner";
import { useGlobalContext } from "@/app/questions/context/global-context";
import { GetMessagesResponseDto } from "@/model/message/GetMessagesResponseDto";
import { NextClient } from "@/tools/NextClient";
import { useEffect, useState } from "react";

export default function MessagesFetcher() {
  const [loading, setLoading] = useState(false);

  const { setMessages } = useGlobalContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        const { data } = await NextClient<GetMessagesResponseDto>(
          `/message/messages`,
          { method: "POST" },
        );

        setMessages(data.messages || []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [setMessages]);

  if (loading) {
    return <Spinner className="absolute top-4 w-4 h-4" />;
  }

  return null;
}
