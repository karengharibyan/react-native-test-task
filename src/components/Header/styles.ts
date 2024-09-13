import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01373b',
  },
  root: {
    // backgroundColor: Colors.white,
    // position: 'absolute',
    width: '100%',
    paddingTop: vp(50),
    paddingHorizontal: vp(12),
    paddingBottom: vp(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: vp(28),
    textAlign: 'center',
    color: '#fff',
  },
  rightContainer: {},
  lefContainer: {
    width: vp(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    marginRight: vp(14),
  },
  backBtn: {
    width: vp(50),
    height: vp(50),
    borderRadius: vp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
