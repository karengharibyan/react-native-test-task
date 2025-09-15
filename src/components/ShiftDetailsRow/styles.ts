import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
      },
      detailLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
      },
      detailValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        justifyContent: 'flex-end',
      },
      detailIcon: {
        fontSize: 16,
        marginRight: 8,
      },
      detailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        textAlign: 'right',
      },
});