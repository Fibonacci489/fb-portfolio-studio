<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- The portfolio is intentionally a single scrolling page: sections use hash-target ids (#services, #portfolio, #process, #projects, #reviews, #contact) with smooth-scroll navigation — the client brief explicitly requested this, so do not split content into separate routes.
- All editable brand/site content (services, portfolio, case studies, guides, contact channels, logo URL) lives in src/data/content.ts. Replace BRAND.logoUrl with the real FB logo asset when supplied; until then the circular FB monogram placeholder renders.
- Never present fabricated reviews, clients, results, credentials, or contact details as facts: REVIEWS stays empty until real reviews are supplied, case studies are labelled illustrative templates, and empty CONTACT_CHANNELS render as "To be added" placeholders.
- Contact submissions are stored in the public.contact_messages table via the public server fn in src/lib/contact.functions.ts (zod-validated server-side, admin client inside the handler). Do not add an anon INSERT policy.
