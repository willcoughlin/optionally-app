import React, { createRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Cell, Col, Row, Table, TableWrapper } from 'react-native-table-component';
import { mapPercentToRedGreenGradient } from '../util';

type ScrollableTableProps = {
  tableData: string[][];
  rowHeaders: string[];
  columnHeaders: string[];
  dataCellWidth: number;
  dataCellHeight: number;
  headerRowHeight: number;
  headerColumnWidth: number;
  containerStyle?: ViewStyle;
};

const ScrollableTable = (props: ScrollableTableProps) => {
  const headerRowScrollViewRef = createRef<ScrollView>();
  const dataCellsHorizontalScrollViewRef = createRef<ScrollView>();

  let isHeaderRowScrolling = false;
  let areDataCellsHorizontallyScrolling = false;

  return (
    <View style={[{ borderWidth: 1, borderRightWidth: 2 }, props.containerStyle]}>
      {/* Header row containing View */}
      <View style={style.flexRow}>
        {/* Static top left corner cell */}
        <View style={{ 
          minHeight: props.headerRowHeight, 
          minWidth: props.headerColumnWidth + 1, // minWidth is bumped up to account for some width weirdness
          borderWidth: 1 }}
        ></View>
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
              data={props.rowHeaders} 
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
                    let pctValueToMap = (parseFloat(cell) + 50) / 100;
                    pctValueToMap = pctValueToMap < 0 ? 0 : pctValueToMap > 1 ? 1 : pctValueToMap;
                    return (
                      <Cell 
                        key={i} 
                        data={cell} 
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