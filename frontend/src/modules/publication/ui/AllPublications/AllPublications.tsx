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

  const { data, refetch, error } = useGetAllPostsQuery(
    {
      token: token ?? "",
      take: take,
      page: page,
    },
    { skip: !token }
  );

  const onRefresh = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    await refetch();
    setLoading(false);
    console.log("all posts is refreshed");
  }, [refetch, token]);

  if (error) {
    console.log("all posts error", error);
  }

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