
The hero-to-about fade was already implemented in the previous turn. The reported "build error" is a Cloudflare R2 upload timeout from Lovable's deploy infrastructure — not a code/build failure. There is nothing in the codebase to fix.

## Plan: No code changes needed

The fade transition is already in place in `src/pages/Home.tsx`:
- `.hero-fade-bottom` overlay (140px desktop / 100px mobile) fading from transparent dark to `#FFFFFF`
- Old 1px transition bar removed
- Mobile height override added

The error message is an infra-level timeout (`context deadline exceeded` while requesting temporary R2 credentials from Cloudflare). It's transient and unrelated to the source code.

### Action
Retry the publish/build. If it keeps failing across multiple retries over several minutes, it's a Lovable platform incident — contact support rather than editing files.
