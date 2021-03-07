# ![OptionAlly](./readmeAssets/horizontal-purple-transparent-cover.png)

## Contents
* [Description](#description)
* [Technologies](#technologies)
* [Source Code](#source-code)
* [Attributions](#attributions)

## Description
OptionAlly is made to help you make smart options trades. Choose your underlying stock, configure your strategy, and view your potential risk and return.

## Technologies
<p align="center">
  <a href="https://docs.expo.io/" style="margin-right: 10%">
    <img src="./readmeAssets/ts-logo-128.svg" width="20%">
  </a>
  <a href="https://docs.expo.io/" style="margin-right: 10%">
    <img src="./readmeAssets/expo-logo.png" width="20%">
  </a>
  <a href="https://docs.expo.io/">
    <img src="./readmeAssets/apollo-logo.png" width="20%">
  </a>
</p>

OptionAlly is built with:
- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/) + [Expo](https://docs.expo.io)
- [GraphQL](https://graphql.org/) + [Apollo Client](https://www.apollographql.com/docs/react/)

## Source Code
Let's have a look at the source code. Not every file will be explained, but we'll discuss the most important ones.
### [src/app/App.tsx](src/app/App.tsx)
This is the App entry point. In here we configure the Apollo GraphQL client, take care of some theming configuration, and set up app navigation.

### [src/app/util.ts](src/app/util.ts)
Some global helper functions live here. Mostly number to string formatting.

### [src/app/components](src/app/components)
React Native Components. These are UI elements that are reused or were complicated enough to pull out into their own component.

#### [src/app/components/OptionSelector.tsx](src/app/components/OptionSelector.tsx)
This component allows for the browsing and selection of an asset's call or put options by expiration date.

#### [src/app/components/ScrollableTable.tsx](src/app/components/ScrollableTable.tsx)
This component is a two-axis scrollable table with sticky row and column headers (the top row and leftmost column). This was developed to display the calculator's return matrix of theoretical returns by underlying asset price and date.

### [src/app/screens/ellipsis-menu](src/app/screens/ellipsis-menu)
App Screens for the ellispis menu navigation stack. When the user presses the three dots icon in the header bar.

### [src/app/screens/main](src/app/screens/main)
App Screens for the main navigation stack. When the user is using the app to set up his or her options strategy and see results.

#### [src/app/screens/main/SelectUnderlyingScreen.tsx](src/app/screens/main/SelectUnderlyingScreen.tsx)
The default screen shown with when the app opens. We present a search bar to allow for selection of an underling stock or ETF.

#### [src/app/screens/main/SelectStrategyScreen.tsx](src/app/screens/main/SelectStrategyScreen.tsx)
This is the second screen in the main navigation stack. Now that the user has selected an underlying asset, we present a list of Radio Buttons so he or she may select which option strategy to proceed with.

#### [src/app/screens/main/SelectOptionLegsScreen.tsx](src/app/screens/main/SelectOptionLegsScreen.tsx)
At this point, the remaining properties of the `CalculatorInput` must be filled. Based on the user's selected strategy, we provide `OptionSelector`s for the user to choose all of their necessary option legs.

#### [src/app/screens/main/ViewResultsScreen.tsx](src/app/screens/main/ViewResultsScreen.tsx)
On load, we query the server for resuts given the input provided in the previous screens. After the server returns, we present the risk/reward details, and show a matrix of returns by underlying asset price and date using our `ScrollableTable` component.

## Attributions
* The TypeScript Logo is attributed to Microsoft, licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
* The Expo Logo is attributed to Expo, licensed under the [MIT License](https://github.com/expo/expo/blob/master/LICENSE).
* The Apollo Logo is attributed to Apollo Graph, Inc., licensed under the [MIT License](https://github.com/apollographql/apollo-client/blob/main/LICENSE).