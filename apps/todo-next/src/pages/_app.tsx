import '../styles/globals.css';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import type { AppProps } from 'next/app';
import { AppRouter } from '@todo/api/src/routers/_app';
import { withTRPC } from '@trpc/next';
import { transformer } from '../utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function getBaseUrl() {
  if (process.browser) {
    return '';
  }
  // // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],

      transformer,
    };
  },
  ssr: true,
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }
    return {};
  },
})(MyApp);
