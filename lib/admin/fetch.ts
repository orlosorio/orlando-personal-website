/**
 * Wrapper around fetch that intercepts 401 responses and redirects to login.
 * Use this instead of raw fetch() in all admin client pages.
 */
export async function adminFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }
  return res;
}
