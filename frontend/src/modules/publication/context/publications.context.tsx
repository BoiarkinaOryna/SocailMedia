import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Post, PublicationSchema } from "@modules/publication/types/publication.types";

export interface PublicationItem extends PublicationSchema {
  id: string;
  // publicztion: Post[]
  // createdAt: string;
}

interface PublicationsContextContract {
  publications: PublicationItem[];
  createPublication: (data: PublicationSchema) => void;
}

const PublicationsContext = createContext<PublicationsContextContract | null>(null);

export function PublicationsProvider(props: PropsWithChildren) {
  const [publications, setPublications] = useState<PublicationItem[]>([]);

  function createPublication(data: PublicationSchema) {
    const publication: PublicationItem = {
      ...data,
      id: `${Date.now()}`,
      // createdAt: new Date().toISOString(),
    };

    setPublications((current) => [publication, ...current]);
  }

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        createPublication,
      }}
      {...props}
    />
  );
}

export function usePublications() {
  const ctx = useContext(PublicationsContext);

  if (!ctx) {
    throw new Error("usePublications must be used inside provider");
  }

  return ctx;
}
