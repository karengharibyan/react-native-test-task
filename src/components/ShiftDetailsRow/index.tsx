import { View, Text } from 'react-native';
import { styles } from './styles';
import { FC } from 'react';

interface Props {
  label: string;
  value: string | number;
  icon?: string;
}

export const DetailRow: FC<Props> = ({ label, value, icon }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.detailValueContainer}>
      {icon && <Text style={styles.detailIcon}>{icon}</Text>}
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);
