import React, { createRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { Cell, Col, Row, Table, TableWrapper } from 'react-native-table-component';
import { mapPercentToRedGreenGradient, toFixedNoNegativeZero } from '../util';

type ScrollableTableProps = {
  entryPrice: number;
  tableData: number[][];
  rowHeaders: number[];
  columnHeaders: string[];
  dataCellWidth: number;
  dataCellHeight: number;
  headerRowHeight: number;
  headerColumnWidth: number;
  containerStyle?: ViewStyle;
};

const ScrollableTable = (props: ScrollableTableProps) => {
  // Refs and flags for linked ScrollViews
  const headerRowScrollViewRef = createRef<ScrollView>();
  const dataCellsHorizontalScrollViewRef = createRef<ScrollView>();
  let isHeaderRowScrolling = false;
  let areDataCellsHorizontallyScrolling = false;

  // Math for corner cell diagonal line
  const cornerCellHypotenuse = Math.hypot(props.headerRowHeight, props.headerColumnWidth + 1);
  const cornerCellAngle = Math.asin(props.headerRowHeight / cornerCellHypotenuse);

  return (
    <View style={[{ borderWidth: 1, borderRightWidth: 2 }, props.containerStyle]}>
      {/* Header row containing View */}
      <View style={style.flexRow}>
        {/* Static top left corner cell */}
        <View style={{ 
          minHeight: props.headerRowHeight, 
          minWidth: props.headerColumnWidth + 1, // minWidth is bumped up to account for some width weirdness
          borderWidth: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 5,
          paddingRight: 5
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'right' }}>Date</Text>
          <View style={{
            position: 'absolute',
            top: 20,
            left: -5,
            height: 1,
            width: cornerCellHypotenuse,
            transform: [ { rotate: cornerCellAngle + 'rad'}],
            borderBottomColor: '#000',
            borderBottomWidth: 1
          }}></View>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>$</Text>
        </View>
        {/* Horizontally scrollable top header row */}
        <ScrollView horizontal ref={headerRowScrollViewRef} scrollEventThrottle={0} showsHorizontalScrollIndicator={false}
          onScroll={e => {
            if (!isHeaderRowScrolling) {
              areDataCellsHorizontallyScrolling = true;
              let scrollX = e.nativeEvent.contentOffset.x;
              dataCellsHorizontalScrollViewRef.current?.scrollTo({ x: scrollX });
            }
            isHeaderRowScrolling = false;
          }}>
          <Table borderStyle={style.tableBorders}>
            <Row 
              textStyle={style.headerText} 
              data={props.columnHeaders} 
              height={props.headerRowHeight}
              widthArr={Array(props.columnHeaders.length).fill(props.dataCellWidth)} />
          </Table>
        </ScrollView>
      </View>
      
      {/* Vertically scrollable rows */}
      <ScrollView contentContainerStyle={style.flexRow} style={{ flexGrow: 0 }}>
          {/* Vertically scrollable header column on left */}
          <Table borderStyle={style.tableBorders}>
            <Col 
              textStyle={style.headerText}
              data={props.rowHeaders.map(rh => rh.toFixed(2))} 
              width={props.headerColumnWidth} 
              heightArr={Array(props.rowHeaders.length).fill(props.dataCellHeight)} />
          </Table>
      
          {/* Scrollable data cells */}
          <ScrollView horizontal scrollEventThrottle={0} ref={dataCellsHorizontalScrollViewRef}
            onScroll={e => {
              if (!areDataCellsHorizontallyScrolling) {
                isHeaderRowScrolling = true;
                let scrollX = e.nativeEvent.contentOffset.x;
                headerRowScrollViewRef.current?.scrollTo({ x: scrollX });
              }
              areDataCellsHorizontallyScrolling = false;
            }}>
            <Table borderStyle={style.tableBorders}>
              {props.tableData.map((row, i) => (
                <TableWrapper key={i} style={style.flexRow}>
                  {row.map((cell, i) => {
                    const pctValueFromPrice = (cell - props.entryPrice) / props.entryPrice;
                    const pctValueToMap = Math.min(Math.max(pctValueFromPrice, -1), 1);  // bound to [-1, 1]
                    return (
                      <Cell 
                        key={i} 
                        data={toFixedNoNegativeZero(cell, 2)}
                        height={props.dataCellHeight} 
                        width={props.dataCellWidth}
                        textStyle={{ textAlign: 'center' }} 
                        style={{ backgroundColor: mapPercentToRedGreenGradient(pctValueToMap)}} />
                    ); 
                  })}
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  flexRow: { flexDirection: 'row' },
  tableBorders: { borderWidth: 1 },
  headerText: { textAlign: 'center', fontWeight: 'bold' }
});

export default ScrollableTable;