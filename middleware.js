import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
const isProctedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organizations(.*)",
  "/projects(.*)",
  "/issues(.*)",
]);
export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProctedRoute(req)) {
    return auth().redirectToSignIn();
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
