import React, { FC, useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StaticScreenProps } from '@react-navigation/native';
import {
  LiquidGlassView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';
import { Shift } from '@/types';
import { DetailRow, ScreenLayout } from '@/components';
import { styles } from './styles';

interface Props
  extends StaticScreenProps<{
    shift: Shift;
  }> {}

export const ShiftDetailsScreen: FC<Props> = ({ route }) => {
  const { shift } = route.params;

  const isFullyBooked = useMemo(() => {
    return (
      (shift.currentWorkers ?? 0) >= (shift.planWorkers ?? 0)
    );
  }, [shift.currentWorkers, shift.planWorkers]);
  const availableSpots = useMemo(() => {
    return Math.max(0, (shift.planWorkers ?? 0) - (shift.currentWorkers ?? 0));
  }, [shift.planWorkers, shift.currentWorkers]);

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LiquidGlassView
          style={[
            styles.headerSection,
            !isLiquidGlassSupported && styles.sectionFallback,
          ]}
          effect="regular"
        >
          <View style={styles.companyHeader}>
            {shift.logo ? (
              <Image source={{ uri: shift.logo }} style={styles.logo} />
            ) : (
              <View style={[styles.logo, styles.logoPlaceholder]}>
                <Text style={styles.logoText}>
                  {shift.companyName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{shift.companyName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>
                  ★ {shift.customerRating?.toFixed(1) ?? 0}
                </Text>
                <Text style={styles.reviewCount}>
                  ({shift.customerFeedbacksCount ?? 0} reviews)
                </Text>
              </View>
            </View>
          </View>
        </LiquidGlassView>

        {/* Job Details Section */}
        <LiquidGlassView
          style={[
            styles.section,
            !isLiquidGlassSupported && styles.sectionFallback,
          ]}
          effect="clear"
        >
          <Text style={styles.sectionTitle}>Job Details</Text>
          <View style={styles.workTypesContainer}>
            {shift.workTypes.map(workType => (
              <Text key={workType.id} style={styles.workType}>
                {workType.name}
              </Text>
            ))}
          </View>

          <DetailRow label="Address" value={shift.address} icon="📍" />
          <DetailRow label="Date" value={shift.dateStartByCity} icon="📅" />
          <DetailRow
            label="Time"
            value={`${shift.timeStartByCity} - ${shift.timeEndByCity}`}
            icon="🕐"
          />
        </LiquidGlassView>

        {/* Payment Section */}
        <LiquidGlassView
          style={[
            styles.section,
            !isLiquidGlassSupported && styles.sectionFallback,
          ]}
          effect="clear"
        >
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentAmount}>₽{shift.priceWorker ?? 0}</Text>
            <Text style={styles.paymentLabel}>per shift</Text>
          </View>
        </LiquidGlassView>

        {/* Staffing Section */}
        <LiquidGlassView
          style={[
            styles.section,
            !isLiquidGlassSupported && styles.sectionFallback,
          ]}
          effect="clear"
        >
          <Text style={styles.sectionTitle}>Staffing</Text>

          <View style={styles.staffingContainer}>
            <View style={styles.staffingItem}>
              <Text style={styles.staffingNumber}>
                {shift.currentWorkers ?? 0}
              </Text>
              <Text style={styles.staffingLabel}>Current Workers</Text>
            </View>

            <View style={styles.staffingDivider} />

            <View style={styles.staffingItem}>
              <Text style={styles.staffingNumber}>{shift.planWorkers}</Text>
              <Text style={styles.staffingLabel}>Needed Workers</Text>
            </View>

            <View style={styles.staffingDivider} />

            <View style={styles.staffingItem}>
              <Text
                style={[
                  styles.staffingNumber,
                  { color: availableSpots > 0 ? '#4CAF50' : '#FF4444' },
                ]}
              >
                {availableSpots}
              </Text>
              <Text style={styles.staffingLabel}>Available Spots</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isFullyBooked ? '#FFE6E6' : '#E6F7E6' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isFullyBooked ? '#FF4444' : '#4CAF50' },
              ]}
            >
              {isFullyBooked
                ? 'Fully Booked'
                : `${availableSpots} spots available`}
            </Text>
          </View>
        </LiquidGlassView>

        {/* Company Rating Section */}
        <LiquidGlassView
          style={[
            styles.section,
            !isLiquidGlassSupported && styles.sectionFallback,
          ]}
          effect="clear"
        >
          <Text style={styles.sectionTitle}>Company Rating</Text>

          <View style={styles.ratingSection}>
            <View style={styles.ratingDisplay}>
              <Text style={styles.ratingNumber}>
                {shift.customerRating?.toFixed(1) ?? 0}
              </Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Text
                    key={star}
                    style={[
                      styles.star,
                      {
                        color:
                          star <= (shift.customerRating ?? 0)
                            ? '#FF9500'
                            : '#E0E0E0',
                      },
                    ]}
                  >
                    ★
                  </Text>
                ))}
              </View>
            </View>
            <Text style={styles.reviewsText}>
              Based on {shift.customerFeedbacksCount} reviews
            </Text>
          </View>
        </LiquidGlassView>
      </ScrollView>

      {/* Apply Button */}
      <LiquidGlassView
        style={[
          styles.bottomSection,
          !isLiquidGlassSupported && styles.sectionFallback,
        ]}
        effect="regular"
      >
        <TouchableOpacity
          style={[
            styles.applyButton,
            { backgroundColor: isFullyBooked ? '#E0E0E0' : '#007AFF' },
          ]}
          disabled={isFullyBooked ?? false}
          onPress={() => {
            // In a real app, this would handle the application process
            console.log('Apply for shift:', shift.id);
          }}
        >
          <Text
            style={[
              styles.applyButtonText,
              { color: isFullyBooked ? '#999' : '#FFFFFF' },
            ]}
          >
            {isFullyBooked ? 'Fully Booked' : 'Apply for This Shift'}
          </Text>
        </TouchableOpacity>
      </LiquidGlassView>
    </ScreenLayout>
  );
};
