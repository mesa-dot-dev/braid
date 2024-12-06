# What the hell do I call this monstrosity of a stack
- There are so many "T"s and "S"s
  - <ins>T</ins>ype<ins>S</ins>cript
  - <ins>T</ins>an<ins>S</ins>tack <ins>S</ins>tart
  - <ins>SST</ins>
  - <ins>T</ins>aylor <ins>S</ins>teele 😏
  - <ins>S</ins>hadcn & <ins>T</ins>ailwind
  - Ruined by Better Auth & Drizzle, c'mon guys 🙂‍↔️
- Potential Names
  - Just the important ones are TypeScript, TanStack Start and SST, so TSTSSSST Stack?
  - [TSST](https://www.youtube.com/watch?v=j6g3UoKxTI8)
  - All the TS's create TSTSSSSTTSST. Rearrange them for TTTTTSSSSSSS. 5T7S.
- The game could be how many T's and S's can you fit into the stack.

# Features

- All TypeScript
- TanStack Start Front End and Server
- AWS Postgres RDS + Drizzle ORM and Drizzle Kit
- Deploy via GitHub Actions
- Automatic Database Migrations via Drizzle Kit API
- PR Environments that share Development Database

# Stack and Decisions
What was chosen and why

## SST
SST is the real star of the show here. This project was to demo it, learn more about it, and try it in a way that's as close to an actual production/enterprise environment as possible. It's worked great so far, and I've become very optimistic about its future and potential--especially in the JavaScript space. Here's why:

- Like other solutions built on top of AWS, SST has successfully recognized that the pain of AWS goes deeper than horrible dashboards. True pain is correctly setting up services you may be unfamiliar with and creating a predictable way for them to communicate with each other. SST does this elegantly without the 400% upcharge from other solutions.
- SST has that [rarest of qualities](https://kentcdodds.com/blog/why-i-love-remix#the-code) where the better you get at using it, the better you get at building sites for the web.
- I see no reason why if I picked this for a bigger project, it couldn't scale with me. When the plethora of their prebuilt components run out, it lets you add your own cloud providers, write the infrastructure you need, and then hook back into the rest of the system. Brilliant.
- I have a ton of confidence that it will work well for my specific use case. I write a lot of internal apps with potentially high complexity, but that don't necessarily need to scale to millions of users. I don't want to manage Nginx or Kube clusters for these apps, I want to be able to focus on the core pieces of the app and the DX needed for myself and others to maintain it. SST lets me not worry about these things and focus on what I actually want to focus on.

I might have previously said that SST isn't for you if you need something a little more server-focused and want the explicit control of managing containers and clusters, but their new container support looks pretty targeted to alleviate that.

No alternatives considered, and I hope my job doesn't make me use Terraform instead of SST.

## TanStack Start

Honestly, I just wanted to try this out, and it's not too shabby at all, even in its alpha state. It's not my [*personally* favorite file router](https://github.com/TanStack/router/discussions/2624), but having automatic intellisense on links and other navigation functions is very nice. The real standout here is the combination of Vite + Nitro + Vinxi. If TSS even becomes moderately well received, that'll be a big proof point for the [Vinxi and SolidStart teams](https://www.solidjs.com/blog/solid-start-the-shape-frameworks-to-come). Even before I started working on this, there was already an undocumented SST TanStack Start component that looks like it basically copied the SolidStart SST component. Showing the power of the Nitro + Vinxi stack there.

The router is pretty nice, the data fetching is good, albeit slightly hard to wrangle with the buffet of options when you add in Query, it's in a nice place for alpha.

### Alternatives worth Considering

NextJS - SST clearly has the best way to [self host Next](https://opennext.js.org/), and I personally really do like the data-fetching + streaming + layout + error story when creating new routes and pages. I've grown to dislike how much it obfuscates from you in the name of ease-of-use, and much prefer Solid Start's and TanStack Start's simplicity. But if I'm gonna be so incredibly real with you all, my biggest reason for not using it is that the DevX in the Vite ecosystem is so, *so* much better than Webpack. Dev server is better, plugins are better, it's just better.

Remix - Remix + Vite is dope, don't use Remix without Vite in 2024 and beyond. I personally like other solutions more, but if you've used and like Remix, go for it. Looking forward to seeing the React Router merge and what they do with RSCs.

SolidStart - In my heart of hearts, I want to be using Solid. But I can't ignore how absurdly large the React ecosystem is, and more importantly, how many of my co-workers know React compared to Solid. We'll get there one day, and I'm excited to see what plans they have for `createAsync`, `createResouce`, and Solid 2.0.

Astro - Use Astro if you have a static or content driven site. I use it for my docs and I love it.

## Tailwind and Shadcn UI

Tbh this is for clicks.

That said, once I get in the groove with Tailwind I find I can be really productive with it. And frankly when used at scale, it really does sidestep a lot of problems with CSS and other CSS solutions. I've used v4 with the Vite plugin before and it's nice, looking forward to that. Shadcn is fine, and it's kind of cool that stuff lives in your codebase. But Radix has become a [victim](https://github.com/radix-ui/primitives/issues/1634) [of its own](https://github.com/radix-ui/primitives/issues/1159) [success](https://github.com/radix-ui/primitives/issues/1342), and has gotten too big and unwieldy for its own good imo. It's such a "not-in-the-funnel" product for WorkOS, I wouldn't be spending time on it if I were them.

### Alternatives worth considering

Vanilla Extract - I still love Vanilla Extract because it's TypeScript CSS. What's not to like?

CSS Modules - Or just get the TypeScript CSS Modules plugin and write vanilla CSS like the GOAT you are.

Literally whatever else you want, pick your favorite. - There's no judgement here. These UI lib and CSS picks are way overblown anyway.

## Drizzle

It's like a better Prisma that's all TypeScript and doesn't have runtime weirdness. Kit and Studio are great.

## Better Auth

I thought I wasn't going to like Better Auth and it was all hype, but I ended up liking it. It struck the right balance between obfuscating the tedium of auth I don't want to directly manage, while still providing options and giving me control when I want it. Which is exactly what I want from auth, it's a pretty solved problem with pretty standard solutions. The real superpower is the plugin architecture and CLI tool, that's pretty slick.

### Alternatives worth considering

Just do it yourself, lmao - Yeah, auth is a pretty solved problem. The thing about Better Auth that's nice is that it just does all the tedium for you, but the tedium is really not that hard or complex to create yourself.

Cognito - If you have a specific reason to want to use Cognito (such as an existing identity pool) over just having it exist in your app, SST makes using it way better. I think SST is cooking some auth solution though, idk what it'll use.

## GitHub Actions

At my job we have self hosted runners with better I/O than the free ones on github.com, so I generally reach for these before reaching for other CI solutions. Something I've learned is that Non-DevOp-sy devs like having their CI close to their repo, and I've really come around to that as well. The control and organization that comes from having as many things as possible in source control can be a huge boon, which extends to the CI itself.

### Alternatives worth considering

SST Console - The enterprise world can be cruel. It's often easier to give existing business partners $10,000 than it is to give new ones $0.10. Any paid service was off the table for this specific project. BUT, if you can you should use the console, it's a great resource and runs on CodeBuild. That said, viewing resources and function invocations has never worked for me *personally*, but I chalk it up to me doing something stupid and setting it up wrong. There still might be some work needed here, but I wish I could use it.

# Checklist
- ✅ Tanstack Start
- ✅ Tailwind
- ✅ Shadcn UI
- ✅ Some form of basic UI
- ✅ SST
- ✅ GitHub Actions
- ✅ Drizzle
- ✅ BetterAuth
- ✅ Drizzle & Prod Migrations in CI

# Wishlist
- SST & VPCs work without `sudo`