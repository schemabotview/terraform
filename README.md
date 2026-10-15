# terraform

The GraphL concept app for **Terraform** — *From Infrastructure as Code to Reliable Change
Management*. Ten courses, one per chapter of [`TERRAFORM-COURSE-PLAN.md`](TERRAFORM-COURSE-PLAN.md);
each section is a scene (diagram or code card), a slide and a narration clip.

Scaffolded from [`content-repo-template`](https://github.com/schemabotview/content-repo-template).
Served at `graphl.in/terraform`.

## Run

```sh
npm install
npm run dev          # http://localhost:5173 — #/ is the catalog, #/<course>-<section> a section
```

## Verify

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a floor: they pass on frames that are visually wrong. The rendered route is the bar.

## Layout

```
TERRAFORM-COURSE-PLAN.md   syllabus — scope, order, sources, technical baseline
src/content/<course>/      one file per section + the course registry
src/scenes/<course>/       scenes for that course
src/theme.css              --brand #7b42bc / --brand-hover / --accent-2
scripts/                   check-content · colab audio notebook · concept.json · titles.json
public/audio/<course>/     narration wavs (Colab + Chatterbox only, never by hand)
```

See `CLAUDE.md` for the course ids, route contract and authoring invariants.
