export const content = `
## It starts with the brief

My first real client project came from a referral. A small business owner who needed a booking system for their clinic. I thought I understood the project from the first call. I didn't.

The problem wasn't that they didn't explain it. The problem was I didn't ask the right questions. I asked about features. I should have asked about constraints: who approves changes, what happens when scope grows, what does "done" actually look like to you.

I started building before any of that was clear. Classic mistake.

---

## Scope creep isn't a client failing

Every developer complains about scope creep. But in my first project I learned something uncomfortable: scope creep is usually a communication failure on both sides.

The client said "can we just quickly add a confirmation email?" Because to them, that sounded small. They weren't trying to expand scope — they genuinely didn't know what that meant in terms of time and complexity (auth setup, SMTP provider, template design, edge cases for failed sends).

The fix isn't to get annoyed. The fix is a written scope document that both parties sign before work starts. Not to be legal about it — to force the conversation about what "done" means before everyone has different mental models.

---

## Feedback is a skill you have to teach

I sent over the first draft and got back: *"Looks good but can we make it more modern?"*

That feedback is useless. Not because the client is difficult — because nobody told them how to give useful feedback.

What I do now: I send previews with specific questions. "Does this navigation structure make sense for your workflow?" or "Are these the right fields for the booking form?" Closed questions that force a real answer. Open questions like "what do you think?" produce open answers that you can't act on.

---

## The actual lesson

The technical part — the React, the database schema, the deployment — that was fine. It was the project management that was hard, and I had zero training in it.

Now before any project starts: scope in writing, one decision-maker named explicitly, feedback cadence agreed upfront (weekly, not whenever). The code is the easy part. Everyone is the hard part.

Three years later I still take notes from every project about what went wrong on the human side. That list is more useful than any technical documentation I've written.
`
