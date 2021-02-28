import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Headline, Subheading, Title } from 'react-native-paper';
import ScrollableTable from '../components/ScrollableTable';
import { CalculateReturnsQueryData, CALCULATE_RETURNS_QUERY } from '../graphql/queries';
import { QueryCalculateReturnsArgs } from '../graphql/types';
import Style from '../style';
import { MainStackParamList } from '../types';
import { formatDollarAmount } from '../util';

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
              <ScrollableTable 
                // columnHeaders={Array.from(Array(30).keys()).map(i => moment().add(i, 'd').format('MM/DD'))}
                // rowHeaders={Array.from(Array(30).keys()).map(i => ((i * 0.5 + 1)*1).toFixed(2))}
                columnHeaders={data.calculateReturns.returnsTable.dates.map(d => moment(d).format('MM/DD'))}
                rowHeaders={data.calculateReturns.returnsTable.underlyingPrices}
                entryPrice={data.calculateReturns.entryCost}
                tableData={data.calculateReturns.returnsTable.dataMatrix} 
                dataCellHeight={40}
                dataCellWidth={70}
                headerRowHeight={40}
                headerColumnWidth={70}
                containerStyle={{ maxHeight: 400 }} />
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

export default ViewResultsScreen;