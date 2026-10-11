import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  /**
   * Run only on admin routes (BodyScopeProvider needs x-next-pathname
   * to detect /admin paths server-side; public pages don't need this header).
   * Keeping it off public routes reduces middleware overhead on every page load.
   */
  matcher: ["/admin/:path*"],
};
