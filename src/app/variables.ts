interface EnvironmentVariables {
  serverUrl: string;
};

const Variables: EnvironmentVariables = __DEV__
  ? ({
    // Dev variables
    // serverUrl: 'http://192.168.1.124:3000/graphql'
    serverUrl: 'https://api.optionally.app/graphql'
  }) 
  : ({
    // Prod variables 
    serverUrl: 'https://api.optionally.app/graphql'
  });

export default Variables;
