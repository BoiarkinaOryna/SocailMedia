import { RefreshControl, ScrollView } from "react-native";
import { PublicationCard } from "../PublicationCard/PublicationCard";
import { styles } from "./all-publications.styles";
import { useUserContext } from "@modules/auth/context/user.context";
import { useCallback, useState } from "react";
import { useGetAllPostsQuery } from "@modules/publication/api/posts.api";

export function AllPublications() {
  const { token } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [take, setTake] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data, refetch } = useGetAllPostsQuery({
    token: token!,
    take: take,
    page: page,
  });

  const onRefresh = useCallback(async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
    console.log("all posts is refreshed");
  }, [refetch]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {data &&
        data.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
    </ScrollView>
  );
}
