import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://w6tcrg3sb4.execute-api.us-east-1.amazonaws.com/example-example-graphql-api":
        {
          headers: {
            Authorization: "100a1feb-25d9-42a7-82e5-dd9d475a1d2d",
          },
        },
    },
  ],
  generates: {
    "./src/types.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
