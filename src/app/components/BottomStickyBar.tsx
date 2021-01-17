import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: { 
    position: 'absolute', 
    left: 0,
    right: 0,
    bottom: 0,
    margin: 20
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressBar: {
    marginBottom: 10
  }
});

type BottomStickyBarProps = {
  progressBarProgress: number,
  backButtonAction?: () => void,
  nextButtonAction?: () => void
};

const BottomStickyBar: FunctionComponent<BottomStickyBarProps> = (props) => (
  <View style={styles.container}>
      <ProgressBar progress={props.progressBarProgress} style={styles.progressBar} />
      <View style={styles.buttonRow}>
        {props.backButtonAction
          ? <Button onPress={props.backButtonAction}>Back</Button>
          : <View></View>
        }
        {props.nextButtonAction
          ? <Button onPress={props.nextButtonAction}>Next</Button>
          : <View></View>
        }
      </View>
  </View>
);

export default BottomStickyBar;