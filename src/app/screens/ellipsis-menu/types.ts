export type EllipsisMenuStackParamList = {
  EllipsisMenuScreen: undefined;
  NotFinancialAdviceScreen: undefined;
  LicensesScreen: undefined;
  OptionAllyLicenseScreen: undefined;
  ThirdPartyLicensesScreen: undefined;
  ThirdPartyLicenseDetailScreen: ThirdPartyLicenseDetailScreenParams;
  LicenseTextScreen: LicenseTextScreenParams;
};

export type ThirdPartyLicenseDetailScreenParams = {
  package: any;
};

export type LicenseTextScreenParams = {
  licenseText: string;
};