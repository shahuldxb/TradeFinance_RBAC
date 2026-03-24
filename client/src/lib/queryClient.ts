import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

function buildUrl(queryKey: readonly unknown[]): string {
  const [baseUrl, ...rest] = queryKey;
  
  if (typeof baseUrl !== "string") {
    throw new Error("First query key element must be a string URL");
  }
  
  const params = new URLSearchParams();
  let finalUrl = baseUrl;
  
  rest.forEach((item, index) => {
    if (item === null || item === undefined) return;
    
    if (typeof item === "string") {
      finalUrl = finalUrl.endsWith("/") ? `${finalUrl}${item}` : `${finalUrl}/${item}`;
    } else if (typeof item === "object" && !Array.isArray(item)) {
      Object.entries(item as Record<string, unknown>).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)));
        } else if (typeof value === "string" && value.length > 0) {
          params.append(key, value);
        }
      });
    }
  });
  
  const queryString = params.toString();
  return queryString ? `${finalUrl}?${queryString}` : finalUrl;
}

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = buildUrl(queryKey);
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
      staleTime: 10000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
