import { Text, View } from "react-native";
import { Image } from "expo-image";

import { styles } from "./publication-card.styles";

import { Post } from "@modules/publication/types/publication.types";

import { ICONS } from "@shared/icons";
import { API_BASE_URL } from "@shared/api/api";

interface PublicationCardProps {
  publication: Post;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  console.log("POST", JSON.stringify(publication, null, 2));

  const images = publication.images ?? publication.post_app_postimage ?? [];
  const links = publication.links ?? publication.post_app_postlink;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.header}>
          <View style={styles.authorRow}>
            <View style={styles.avatarWrap}>
              <Image
                source={require("@assets/LinaLi.jpg")}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.authorName}>Lina Li</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.body}>
        <Text style={styles.title}>{publication.title}</Text>

        <Text style={styles.content}>{publication.content}</Text>

        {!!images.length && (
          <View style={styles.imageGrid}>
            {images.map((image, index) => {
              const imageName = image.original_image ?? image.compressed_image;

              if (!imageName) return null;

              return (
                <Image
                  key={image.id ?? `${imageName}-${index}`}
                  source={{
                    uri: `${API_BASE_URL}/uploads/${imageName}`,
                  }}
                  style={styles.postImage}
                  contentFit="cover"
                />
              );
            })}
          </View>
        )}

        {!!links?.length && (
          <Text style={styles.link}>
            {links.map((link: any) => link.url ?? link).join(", ")}
          </Text>
        )}

        <View style={styles.activityView}>
          <View style={styles.activity}>
            <ICONS.SvgHeart />
            <Text>0 вподобань</Text>
          </View>

          <View style={styles.activity}>
            <ICONS.SvgThumbUp />
            <Text>0 лайків</Text>
          </View>

          <View style={styles.activity}>
            <ICONS.SvgEyeOpen />
            <Text>0 переглядів</Text>
          </View>
        </View>
      </View>
    </View>
  );
}