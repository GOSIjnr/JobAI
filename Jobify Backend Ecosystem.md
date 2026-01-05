## Overview

This document describes the **current authentication and cookie-sharing problem** across our services and frontends, the constraints we are operating under, and the open questions that still require research and decisions.

The purpose of this README is to **align everyone involved** before deeper discussions, experimentation, or architectural changes.

## Services & Applications

We currently operate multiple independent services, each with its own frontend:
- **Auth Service**
    - Responsible for login, session creation, and session validation
    - Session-based authentication (❌ no JWT-based auth by design)

- **Ecom Service**
    - Has its own backend and frontend
    - Needs to trust authenticated users from Auth

- **Matching Service**
    - Independent backend + frontend
    - Same authentication requirement
    - Talks to the `matching ai service` using a JWT payload

- **Roadmap Service**
    - Independent backend + frontend
    - Same authentication requirement

Each service is deployed independently and communicates over HTTP.

## Authentication Philosophy
- Authentication is **session-based**, not JWT-based
- A session ID represents the source of truth
- Wrapping a session ID inside a JWT is considered **unnecessary bloat** and goes against the intended model

**We want:**
- Minimal payloads
- Clear session invalidation
- Server-side control

## The Core Problem

### ❓ How can multiple backends trust the same authenticated user?

More specifically:
- The **Auth backend** sets the session cookie
- Other backends (**Ecom, Matching, Roadmap**) must:
    - Read the same session
    - Trust that the session is valid
    - Do this securely in **both local development and production**

### ❗ The Issue

Cookies:
- Are **domain-bound**
- Are primarily designed for **browser ↔ backend**, not **backend ↔ backend** communication

This leads to several blockers:

1. **Different backends cannot automatically see the same cookies**
2. Cookies do not naturally propagate during backend-to-backend calls
3. Local development complicates this further due to:
    - `localhost`
    - Different ports
    - No shared root domain

## Current Constraints

### 1. No Stable Domain Yet

- We **do not currently have a shared domain** (e.g. `.example.com`)
- This blocks:
    - Proper cross-subdomain cookies
    - Realistic production-like cookie behavior

Because of this:
- Any cookie strategy today is **temporary**
- Research is required before finalizing the approach

### 2. Local Development Complexity

In local development:
- Each service runs independently
- Common patterns like:
    - `localhost:3000`
    - `localhost:4000`
    - `localhost:5000`

- Cookies:
    - Cannot be shared cleanly across ports
    - Behave differently than in production

Possible tools (not yet finalized):

- Frontend proxies (e.g. React proxy)
- Reverse proxies (NGINX, YARP, etc.)

These may help locally but **do not solve the core architecture question**.

## Backend-to-Backend Authentication (Open Question)

### The Key Question

> How does Backend A (Ecom / Matching / Roadmap) verify a user session created by Auth?

Important notes:
- Cookies alone are insufficient for backend-to-backend trust
- Simply forwarding raw session IDs is risky if not properly secured

Concerns include:
- Session ID leakage
- Replay attacks
- Frontend interception if exposed incorrectly

## Considered Solutions (Clear, Ranked, and Explicit)

> ⚠️ None of the options below are final. This section exists to make trade-offs explicit and avoid accidental or hacky decisions.

---

### Option 1: Gateway / BFF Pattern (**Recommended – Long Term**)

A single entry point (Gateway / BFF) handles:
- Cookies
- Session validation via Auth
- Forwarding authenticated requests to internal services

Other services become **internal-only** and never see browser cookies.

##### Pros:
- Cleanest security boundary
- Cookies stay browser-facing only
- Centralized auth logic
- Strong production-grade model
- Scales well with more services

##### Cons:
- Added infrastructure
- More moving parts
- Slower to implement correctly

### Option 2: Backend-to-Backend Auth Header (**Strong Candidate**)

Frontend sends cookies only to Auth. Auth validates the session and issues a **short-lived internal token**. Other backends trust Auth-issued verification.

##### Pros:
- Keeps cookies browser-only
- Clear trust boundary
- Works without shared cookies
- Easier than a full gateway

##### Cons:
- Needs careful design
- Token lifecycle must be tight
- Easy to make hacky if rushed

### Option 3: Shared Session Store (**Technically Valid, Architecturally Heavy**)

All backends validate sessions against a shared store (e.g. Redis).

##### Pros:
- Simple session model
- Centralized invalidation
- No extra auth tokens

##### Cons:
- Strong coupling between services
- Shared infrastructure dependency
- Blurs service boundaries
- Harder to evolve later

### Option 4: Single Unified Backend Codebase (**Simplest Short-Term**)

All services live in one backend codebase (single language), separated logically but deployed together.

##### Pros:
- No cookie or session sharing issues
- Simplest mental model
- Very easy local development
- No backend-to-backend trust problem

##### Cons:
- Reduced service independence
- Slower deployments
- Harder to split later if not disciplined

### Option 5: Multiple Services, Single Container / Image (**Early-Stage Compromise**)

All backend services are built into one container image and run together.

##### Pros:
- Avoids cross-domain cookie issues
- Single deployment artifact
- Works without a real domain

##### Cons:
- Operational complexity
- Harder scaling
- One failure can affect all services
- Awkward middle ground

## Why This Problem Is Hard

This is **not** a cookie configuration problem. It is a **trust-boundary problem**.

Key reasons:

1. **Cookies are browser primitives**
    - Designed for browser ↔ backend although domain would still be needed in the browser aspect with multiple frontends
    - Not backend ↔ backend

2. **Sessions are domain-bound**
    - No shared domain = no clean cookie sharing

3. **Local development lies**
    - `localhost` hides real production behavior
    - Ports are not domains

4. **Microservices amplify auth complexity**
    - Each boundary needs trust
    - Auth must be explicit, not implicit

5. **Session-based auth is stricter than JWT**
    - Server-side state
    - Clear invalidation requirements

## Ranking Summary

|Rank|Option|Fit|
|---|---|---|
|1|Gateway / BFF|Best long-term, cleanest model|
|2|Backend-to-Backend Auth Header|Strong balance of effort vs correctness|
|3|Shared Session Store|Works but couples services|
|4|Unified Codebase|Fastest to ship, least flexible|
|5|Single Container|Temporary, early-stage only|

## Recommendation (Explicit)

### Short Term (Now)

Because we:
- Do not have a domain
- Want to avoid rewrites
- Use session-based auth

**Avoid complex cookie sharing entirely.**

Prefer:
- Option 2 (Backend-to-Backend Auth Header)
- OR Option 4 (Unified Codebase) if speed matters more than service separation

### Long Term (Production-Ready)

Once we have:
- A real domain
- Stable infrastructure

Move toward:

👉 **Option 1: Gateway / BFF Pattern**

This solves the problem **by design**, not by configuration.

---

## Final Note

If a solution requires:
- Cookie forwarding
- Manual header hacks
- “Temporary” exceptions

…it is already the wrong solution.

This problem should be solved **once, clearly, and intentionally**.

Key attributes under discussion:
- `HttpOnly`
- `Secure`
- `SameSite` (`Lax` vs `None`)

### Notes
- `SameSite=Lax` may work for same-site navigation
- `SameSite=None` requires HTTPS and careful handling
- Without a real domain, **testing these properly is limited**

## What Is NOT the Goal

- ❌ Hacking something temporary that must be rewritten later
- ❌ Using JWT just to transport a session ID
- ❌ Leaking session identifiers to frontends unnecessarily

## Current Status

- ❗ Cookie sharing across services is **NOT solved yet**
- ❗ Backend-to-backend authentication is **under active discussion**
- ❗ Final decisions are blocked by:
    - Lack of domain
    - Need for further research

## Next Steps

1. Decide on **long-term domain strategy**
2. Research production-grade patterns for:
    - Session-based auth across services
    - Backend trust boundaries

3. Prototype **one clean approach** (not hacky)
4. Revisit cookie configuration once domain exists

## Summary

This problem is **architectural**, not just configuration-based.

Until we have:
- A shared domain
- A clear backend trust model

Any solution remains **temporary** and should be treated as such.

This README exists to ensure we solve it **once, correctly**.
