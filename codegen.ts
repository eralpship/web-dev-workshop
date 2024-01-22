
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/server/schema.graphql",
  generates: {
    "src/generated/types/server.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../../server/server#ServerContext",
      }
    }
  }
};

export default config;
