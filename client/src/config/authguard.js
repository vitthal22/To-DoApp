import { initializeAuthguard, Provider } from "@authguard/react";

export const authguardConfig = {
  oidc_url: "http://localhost:5173/.well-known/openid-configuration",
  jwks_url: "http://localhost:5173/oauth2/jwks",
  token_url: "http://localhost:5173/oauth2/token",
  redirect_url: "http://localhost:3000",
  authorize_url: "http://localhost:5173/oauth2/authorize",
  user_info_url: "http://localhost:5173/userinfo",
  refresh_token_url: "http://localhost:5173/oauth2/token",
  revoke_token_url: "http://localhost:5173/oauth2/revoke",
  grant: "authorization_code",
  scope: "openid",
  credentials: {
    client_id: "7215a38a-ccfb-4b35-844f-7433918f56d6",
    client_secret: "0c8ea765-ddf3-44fd-b188-d3a353d3801e",
  },
};

initializeAuthguard(authguardConfig);
export default Provider;
