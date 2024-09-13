import {FlatList, Text} from '@gluestack-ui/themed';
import {FC, useCallback, useContext} from 'react';
import {ListRenderItem, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {AppContext} from '@src/context';
import {Tag} from '@src/types';

interface ITagsCarouselProps {}

export const TagsCarousel: FC<ITagsCarouselProps> = () => {
  const {tags, selectedTag, setSelectedTag} = useContext(AppContext);

  const renderTag = useCallback<ListRenderItem<Tag>>(
    ({item}) => {
      const color = selectedTag === item.id ? '$amber400' : '$white400';
      return (
        <TouchableOpacity
          style={styles.tagRoot}
          onPress={() =>
            setSelectedTag(selectedTag !== item.id ? item.id : undefined)
          }>
          <Text color={color} size="lg">
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedTag],
  );
  return (
    <View style={styles.root}>
      <FlatList
        horizontal
        data={tags}
        // @ts-expect-error needed to fix
        renderItem={renderTag}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
