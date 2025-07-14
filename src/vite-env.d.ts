/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STELLAR_NETWORK: string;
  readonly PUBLIC_STELLAR_NETWORK_PASSPHRASE: string;
  readonly PUBLIC_STELLAR_RPC_URL: string;
  readonly PUBLIC_STELLAR_HORIZON_URL: string;
  readonly PUBLIC_USDC_CONTRACT?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly PUBLIC_SUPABASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
