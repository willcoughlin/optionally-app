interface EnvironmentVariables {
  serverUrl: string;
};

const Variables: EnvironmentVariables = __DEV__
  ? ({
    // Dev variables
    serverUrl: 'http://192.168.1.106:3000/graphql'
  }) 
  : ({
    // Prod variables 
    serverUrl: ''
  });

export default Variables;
