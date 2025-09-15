import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollContent: {
      paddingBottom: 100, // Space for bottom button
    },
    headerSection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(224, 224, 224, 0.3)',
    },
    companyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    logoPlaceholder: {
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#666',
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 6,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 16,
      color: '#FF9500',
      marginRight: 8,
    },
    reviewCount: {
      fontSize: 14,
      color: '#666',
    },
    section: {
      margin: 16,
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionFallback: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
    },
    workType: {
      fontSize: 16,
      color: '#333',
      marginBottom: 16,
      fontWeight: '500',
    },
    paymentContainer: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    paymentAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    paymentLabel: {
      fontSize: 16,
      color: '#666',
      marginTop: 4,
    },
    staffingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    staffingItem: {
      alignItems: 'center',
      flex: 1,
    },
    staffingNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    staffingLabel: {
      fontSize: 12,
      color: '#666',
      marginTop: 4,
      textAlign: 'center',
    },
    staffingDivider: {
      width: 1,
      height: 40,
      backgroundColor: '#E0E0E0',
      marginHorizontal: 10,
    },
    statusBadge: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
    },
    ratingSection: {
      alignItems: 'center',
    },
    ratingDisplay: {
      alignItems: 'center',
      marginBottom: 8,
    },
    ratingNumber: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#FF9500',
      marginBottom: 8,
    },
    starsContainer: {
      flexDirection: 'row',
    },
    star: {
      fontSize: 20,
      marginHorizontal: 2,
    },
    reviewsText: {
      fontSize: 14,
      color: '#666',
    },
    bottomSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: 'rgba(224, 224, 224, 0.3)',
    },
    applyButton: {
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    applyButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    workTypesContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  });
  