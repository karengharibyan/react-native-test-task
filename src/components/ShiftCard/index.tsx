import { Shift } from '@/types';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { FC } from 'react';
import {
  Image,
  PlatformColor,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '@/enums';

interface Props {
  shift: Shift;
}

export const ShiftCard: FC<Props> = ({ shift }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(NavigationRoutes.ShiftDetails, { shift });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <LiquidGlassView
        style={[styles.card, !isLiquidGlassSupported && styles.cardFallback]}
        effect="clear"
        interactive
      >
        <View style={styles.cardHeader}>
          {shift.logo?.length > 0 ? (
            <Image source={{ uri: shift.logo }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Text style={styles.logoText}>
                {shift.companyName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text
              style={[
                styles.companyName,
                isLiquidGlassSupported && {
                  color: PlatformColor('labelColor'),
                },
              ]}
              numberOfLines={1}
            >
              {shift.companyName}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                ★ {shift.customerRating?.toFixed(1) ?? 0}
              </Text>
              <Text style={styles.reviewCount}>
                ({shift.customerFeedbacksCount ?? 0} reviews)
              </Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₽{shift.priceWorker ?? 0}</Text>
          </View>
        </View>

        <View style={styles.workTypesContainer}>
          {shift.workTypes.map(workType => (
            <Text
              key={workType.id}
              style={[
                styles.workTypeItem,
                isLiquidGlassSupported && {
                  color: PlatformColor('labelColor'),
                },
              ]}
            >
              {workType.name}
            </Text>
          ))}
        </View>

        <Text
          style={[
            styles.address,
            isLiquidGlassSupported && {
              color: PlatformColor('secondaryLabelColor'),
            },
          ]}
          numberOfLines={2}
        >
          {shift.address}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.timeContainer}>
            <Text style={styles.date}>{shift.dateStartByCity}</Text>
            <Text style={styles.time}>
              {shift.timeStartByCity} - {shift.timeEndByCity}
            </Text>
          </View>
          <View style={styles.workersContainer}>
            <Text style={styles.workers}>
              {shift.currentWorkers}/{shift.planWorkers} workers
            </Text>
            <View
              style={[
                styles.workersIndicator,
                {
                  backgroundColor:
                    shift.currentWorkers && shift.planWorkers && shift.currentWorkers >= shift.planWorkers
                      ? '#FF4444'
                      : '#4CAF50',
                },
              ]}
            />
          </View>
        </View>
      </LiquidGlassView>
    </TouchableOpacity>
  );
};
