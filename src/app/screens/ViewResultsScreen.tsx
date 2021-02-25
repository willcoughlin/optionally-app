import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { createRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, Headline, Text, Subheading, Title, DataTable } from 'react-native-paper';
import { CalculateReturnsQueryData, CALCULATE_RETURNS_QUERY } from '../graphql/queries';
import { QueryCalculateReturnsArgs } from '../graphql/types';
import Style from '../style';
import { MainStackParamList } from '../types';
import { formatDollarAmount } from '../util';
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

/* Related types */
type ViewResultsScreenProps = {
  route: RouteProp<MainStackParamList, 'ViewResultsScreen'>;
  navigation: StackNavigationProp<MainStackParamList, 'ViewResultsScreen'>;
};

/* Define screen */
const ViewResultsScreen = ({ route, navigation }: ViewResultsScreenProps) => {
  const { loading, error, data } = useQuery<CalculateReturnsQueryData, QueryCalculateReturnsArgs>(
    CALCULATE_RETURNS_QUERY, {
      variables: {
        input: route.params.calculatorInput
      }
    });

    const tableData = {
      tableHead: Array.from(Array(30).keys()),
      tableTitle: Array.from(Array(9).keys()),
      tableData: Array.from({ length: 9 }, 
        (_, i) => Array.from(Array(30).keys()))
    };

  const headerRowScrollView = createRef<ScrollView>();
  const tableHorizontalScrollView = createRef<ScrollView>();
  let headerRowIsScrolling = false;
  let tableIsHorizontallyScrolling = false;

  return (
    <View style={Style.container}>
      {loading && <ActivityIndicator animating />}
      {!loading && data &&
        <>
          <View>
            <Headline>Here are your results</Headline>
            <View style={[Style.standardTopMargin, Style.flexRowSpaceBetween]}>
              <Subheading style={{ fontWeight: 'bold' }}>{data.calculateReturns.entryCost < 0 ? 'Premium received' : 'Entry cost'}</Subheading>
              <Subheading>{formatDollarAmount(Math.abs(data.calculateReturns.entryCost))}</Subheading>
            </View>
            <View style={Style.flexRowSpaceBetween}>
              <Subheading style={{ fontWeight: 'bold' }}>Maximum profit</Subheading>
              <Subheading>{data.calculateReturns.maxReturn ? formatDollarAmount(data.calculateReturns.maxReturn) : 'Unlimited'}</Subheading>
            </View>
            <View style={Style.flexRowSpaceBetween}>
              <Subheading style={{ fontWeight: 'bold' }}>Maximum loss</Subheading>
              <Subheading>{data.calculateReturns.maxRisk ? formatDollarAmount(data.calculateReturns.maxRisk) : 'Unlimited'}</Subheading>
            </View>
            <View style={Style.flexRowSpaceBetween}>
              <Subheading style={{ fontWeight: 'bold' }}>{data.calculateReturns.breakEvenAtExpiry.length > 1 ? 'Upper break-even' : 'Break-even'}</Subheading>
              <Subheading>{formatDollarAmount(data.calculateReturns.breakEvenAtExpiry[0])}</Subheading>
            </View>
            {data.calculateReturns.breakEvenAtExpiry.length > 1 &&
              <View style={Style.flexRowSpaceBetween}>
                <Subheading style={{ fontWeight: 'bold' }}>Lower break-even</Subheading>
                <Subheading>{formatDollarAmount(data.calculateReturns.breakEvenAtExpiry[1])}</Subheading>
              </View> 
            }
            <View style={Style.standardTopMargin}>
              <Title>Profit/Loss Table</Title>
              
              <View style={{ maxHeight: 400, borderWidth: 1, borderRightWidth: 2 }}>
                {/* Header row View */}
                <View style={{ flexDirection: 'row' }}>
                  {/* Static top left corner cell */}
                  <View style={{ 
                    minHeight: 50, 
                    minWidth: 51, // minWidth is bumped up to account for some width weirdness
                    borderWidth: 1 }}
                  ></View>
                  {/* Horizontally scrollable top header row */}
                  <ScrollView ref={headerRowScrollView} horizontal showsHorizontalScrollIndicator={false}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                      <Row data={tableData.tableHead} widthArr={Array(30).fill(50)} height={50} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                    </Table>
                  </ScrollView>
                </View>
                {/* Scrollable rows */}
                <ScrollView contentContainerStyle={{ flexDirection: 'row' }} style={{ flexGrow: 0 }}>
                {/* <View style={{ flexDirection: 'row' }}> */}
                  {/* Vertically scrollable leftmost header column */}
                  <Table borderStyle={{ borderWidth: 1 }}>
                    <Col data={tableData.tableTitle} heightArr={Array(30).fill(50)} width={50} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                  </Table>
                  {/* Scrollable columns */}
                  <ScrollView 
                    horizontal={true} 
                    ref={tableHorizontalScrollView}
                    scrollEventThrottle={16}
                    onScroll={e => {
                      if (!tableIsHorizontallyScrolling) {
                        headerRowIsScrolling = true;
                        let scrollX = e.nativeEvent.contentOffset.x;
                        headerRowScrollView.current?.scrollTo({ x: scrollX });
                      }
                      tableIsHorizontallyScrolling = false;
                    }}
                  >
                    <Table borderStyle={{ borderWidth: 1 }}>
                      <Rows data={tableData.tableData} widthArr={Array(30).fill(50)}  heightArr={Array(30).fill(50)} textStyle={{ textAlign: 'center' }} />
                    </Table>
                  </ScrollView>
                {/* </View> */}
              </ScrollView>
              </View>
            </View>
          </View>
          <Button 
            mode="outlined"
            onPress={() => {}}
          >
            Start Over
          </Button>
        </>
      }
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//   wrapper: { flexDirection: 'row' },
//   title: { flex: 1, backgroundColor: '#f6f8fa' },
//   row: {  height: 28  },
//   text: { textAlign: 'center' }
// });

const styles = StyleSheet.create({
  header: { backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { backgroundColor: '#E7E6E1' }
});

export default ViewResultsScreen;