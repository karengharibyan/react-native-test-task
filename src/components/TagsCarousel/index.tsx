import { FlatList, Text} from '@gluestack-ui/themed';
import {FC, useCallback, useContext, useEffect} from 'react';
import {ListRenderItem, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {AppContext} from '@src/context';
import {useNavigation} from '@react-navigation/native';
import {withDatabase, withObservables} from '@nozbe/watermelondb/react';
import {Tag} from '@src/database/models';
import {Database} from '@nozbe/watermelondb';

interface ITagsCarouselProps {
  tags: Tag[];
}

export const TagsCarouselBase: FC<ITagsCarouselProps> = ({tags}) => {
  const {selectedTag, setSelectedTag} = useContext(AppContext);
  const navigation = useNavigation();

  useEffect(() => {
    //@ts-expect-error needed to fix
    navigation.setParams({selectedTag});
  }, [selectedTag]);
  
  const renderTag = useCallback<ListRenderItem<Tag>>(
    ({item}) => {
      const color = selectedTag === item.id ? '$amber400' : '$blueGray500';
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
      <Text size="sm" mb="$1">Filter by Tag</Text>
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

const enhance = withObservables(['database'], ({database}) => {
  return {
    tags: (database as Database).get<Tag>('tags').query().observe(),
  };
});

export const TagsCarousel = withDatabase(enhance(TagsCarouselBase));
